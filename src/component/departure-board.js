import { h } from 'preact'
import Trains from './trains'

export default (props) => {
  const station = props.predictionData.station
  const platforms = props.predictionData.platforms

  const generatedPlatforms = Object.keys(platforms).map((platform, i) => (
    <div className='platform' key={`platform-${i}`}>
      <h2 className='platform__heading'>{platform}</h2>
      <Trains trains={platforms[platform]} />
    </div>
  ))

  return (
    <div className='departures'>
      <h1 className='departures__heading'>
        {`${station.stationName} Station, ${station.lineName} Line`}
      </h1>
      {generatedPlatforms}
    </div>
  )
}
