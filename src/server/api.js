import tflRequest from './tfl-request'
import networkData from '../common/data'
import { isStationOnLine, mergeGroupedLines } from '../common/utils'

export default (line, station) => {

  return new Promise((resolve, reject) => {

    // validate request
    if (!isStationOnLine(line, station, networkData)) {
      const err = new Error()

      err.message = 'Invalid station and/or line combination'
      err.status = 400

      return reject(err)
    }

    // Go fetch any lines that share the platform
    const lines = mergeGroupedLines(line, station, networkData)

    resolve(tflRequest(lines, station))
  })
    .then((data) => {
      return {
        request: {
          lineCode: line,
          stationCode: station
        },
        station: {
          lineName: networkData.lines[line],
          stationName: networkData.stations[station]
        },
        platforms:
          data
            .sort((a, b) => {
              return a.timeToStation - b.timeToStation
            })
            .reduce((map, record) => {
              map[record.platformName] = map[record.platformName] || []
              map[record.platformName].push(record)

              return map
            }, {})
      }
    })

}
