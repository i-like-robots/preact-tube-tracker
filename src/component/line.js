import { h, Component } from 'preact'

export default class Network extends Component {

  handleSubmit (e) {
    e.preventDefault()

    // Dispatch an event for other components to capture
    const updateEvent = new window.CustomEvent('tt:update', {
      detail: {
        station: this.station.value,
        line: this.props.lineCode
      },
      bubbles: true
    })

    e.target.dispatchEvent(updateEvent)
  }

  render () {
    const lineCode = this.props.lineCode
    const networkData = this.props.networkData
    const stationsOnThisLine = networkData.stationsOnLines[lineCode]

    const generatedOptions = stationsOnThisLine.map((stationCode, i) => (
      <option value={stationCode} key={`stationCode-${i}`}>
        {networkData.stations[stationCode]}
      </option>
    ))

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className={`network__line network__line--${lineCode}`}>
          <legend>{networkData.lines[lineCode]}</legend>
          <input type='hidden' name='line' value={lineCode} />
          <select name='station' ref={(c) => this.station = c}>
            {generatedOptions}
          </select>
          <button type='submit' title='View train times'>Go</button>
        </fieldset>
      </form>
    )
  }

}
