import { h, Component } from 'preact'
import DepartureBoard from './departure-board'
import Notice from './notice'
import { httpRequest, apiRequestUrl } from '../common/utils'

export default class Predictions extends Component {

  constructor (props) {
    super(props)

    this.state = {
      status: this.props.initialData ? 'success' : 'welcome',
      predictionData: this.props.initialData
    }
  }

  fetchPredictions (line, station) {
    this.setState({ status: 'loading' })

    httpRequest(
      apiRequestUrl(line, station),
      this.fetchSuccess.bind(this),
      this.fetchError.bind(this)
    )
  }

  fetchError (err) {
    this.setState({
      status: 'error',
      predictionData: null
    })

    // Pipe the error into your error logging setup
    // Airbrake.push({ error: error })
    console.error(err)
  }

  fetchSuccess (responseData) {
    if (!responseData.length) {
      return this.fetchError(new Error('Invalid API response'))
    }

    this.setState({
      status: 'success',
      predictionData: JSON.parse(responseData)
    })
  }

  resetPoll (line, station) {
    this.fetchPredictions(line, station)

    if (this.poll) {
      clearInterval(this.poll)
    }

    this.poll = setInterval(this.fetchPredictions.bind(this, line, station), 1000 * 30)
  }

  componentDidMount () {
    if (this.props.line && this.props.station) {
      this.resetPoll(this.props.line, this.props.station)
    }
  }

  componentWillUnmount () {
    clearInterval(this.poll)
  }

  componentWillReceiveProps (newProps) {
    this.resetPoll(newProps.line, newProps.station)
  }

  shouldComponentUpdate (newProps, newState) {
    // Only update when line/station changes or new predictions load otherwise the
    // loading notice will be displayed when refreshing current predictions.
    return this.props !== newProps || this.state.predictionData !== newState.predictionData
  }

  render () {
    if (this.state.status === 'success') {
      return <DepartureBoard predictionData={this.state.predictionData} />
    }

    return <Notice type={this.state.status} />
  }

}
