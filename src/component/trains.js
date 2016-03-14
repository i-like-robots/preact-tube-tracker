import { h } from 'preact'
import { formattedTimeUntil } from '../common/utils'

export default (props) => {
  const generatedTrains = props.trains.map((train, i) => {
    const timeTo = formattedTimeUntil(train.timeToStation)

    return (
      <tr className='trains__arrival' key={`train-${i}`}>
        <td>{timeTo === '0:00' ? '-' : timeTo}</td>
        <td>{train.towards}</td>
        <td>{train.lineName}</td>
        <td>{train.currentLocation}</td>
      </tr>
    )
  })

  return (
    <table className='trains'>
      <thead>
        <tr>
          <th>Time</th>
          <th>Destination</th>
          <th>Line</th>
          <th>Current location</th>
        </tr>
      </thead>
      <tbody>
        {generatedTrains}
      </tbody>
    </table>
  )
}
