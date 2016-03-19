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
    if (this.poll) {
      clearInterval(this.poll)
    }

    this.poll = setInterval(this.fetchPredictions.bind(this, line, station), 1000 * 30)
  }

  componentDidMount () {
    const { line, station } = this.props

    if (line && station) {
      this.resetPoll(line, station)
    }
  }

  componentWillUnmount () {
    clearInterval(this.poll)
  }

  componentWillReceiveProps (newProps) {
    const { line, station } = newProps

    this.fetchPredictions(line, station)
    this.resetPoll(line, station)
  }

  shouldComponentUpdate (newProps, newState) {
    // Only update when line/station changes or new predictions load otherwise the
    // loading notice will be displayed when refreshing current predictions.
    return newState.status !== 'loading' || this.props !== newProps
  }

  render () {
    if (this.state.status === 'success') {
      return <DepartureBoard predictionData={this.state.predictionData} />
    }

    return <Notice type={this.state.status} />
  }

}
