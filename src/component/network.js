import { h, Component } from 'preact'
import Line from './line'
import { debounceEvent } from '../common/utils'

export default class Network extends Component {

  constructor (props) {
    super(props)

    this.state = {
      collapsible: null,
      open: false
    }
  }

  componentDidMount () {
    this.handleResize()

    // Simple event debouncing to avoid multiple recalculations
    this.debounce = debounceEvent(this.handleResize.bind(this), 250)
    window.addEventListener('resize', this.debounce, false)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debounce, false)
  }

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  handleResize () {
    this.setState({ collapsible: window.innerWidth <= 800 })
  }

  render () {
    const networkData = this.props.networkData
    const networkLineCodes = Object.keys(networkData.lines)

    const toggleText = this.state.open ? 'Close' : 'Open'
    const toggleClass = this.state.collapsible ? (this.state.open ? 'is-open' : 'is-closed') : 'is-static'

    const generatedForms = networkLineCodes.map((lineCode, i) => (
      <Line networkData={networkData} lineCode={lineCode} key={`lineCode-${i}`} />
    ))

    return (
      <div className={`network ${toggleClass}`}>
        {generatedForms}
        <button type='button' className='network__toggle' onClick={this.handleToggle.bind(this)}>
          {toggleText}
        </button>
      </div>
    )
  }

}
