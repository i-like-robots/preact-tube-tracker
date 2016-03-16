import { h, Component } from 'preact'
import Predictions from './predictions'
import Network from './network'
import { isStationOnLine, formatQueryString } from '../common/utils'

export default class TubeTracker extends Component {

  constructor (props) {
    super(props)

    this.state = {
      line: props.initialData ? props.initialData.request.lineCode : null,
      station: props.initialData ? props.initialData.request.stationCode : null
    }
  }

  formatAndValidateUserInput (line, station) {
    // We could have added extra states for invalid data
    // but it's easier simply to ignore it.
    if (isStationOnLine(line, station, this.props.networkData)) {
      return { line, station }
    }
  }

  handleUpdate (e) {
    const input = this.formatAndValidateUserInput(e.detail.line, e.detail.station)
    input.line && this.setState(input)
  }

  componentWillUpdate (newProps, newState) {
    // When the state changes push a query string so users can bookmark
    // or share the link to a chosen departure board.
    window.history.pushState(null, null, formatQueryString(newState))
  }

  componentDidMount () {
    window.addEventListener('tt:update', this.handleUpdate.bind(this), false)
  }

  render () {
    return (
      <div className='layout'>
        <div className='layout__sidebar'>
          <Network networkData={this.props.networkData} />
        </div>
        <div className='layout__content'>
          <Predictions
            line={this.state.line}
            station={this.state.station}
            networkData={this.props.networkData}
            initialData={this.props.initialData} />
        </div>
      </div>
    )
  }

}
