import { request } from 'https'

function formatPath (lines, station) {
  const query = [
    `stopPointId=${station}`,
    `app_id=${process.env.APP_ID}`,
    `app_key=${process.env.APP_KEY}`
  ]

  return `/Line/${lines.join(',')}/Arrivals?${query.join('&')}`
}

function parseResponse (response) {
  let data

  try {
    data = JSON.parse(response)
  } catch (err) {
    return new Error('Data could not be parsed')
  }

  if (data.$type && data.$type.match(/HttpError/)) {
    return new Error(data.message)
  }

  return data
}

export default (lines, station) => {

  return new Promise((resolve, reject) => {

    const options = {
      path: formatPath(lines, station),
      hostname: 'api.tfl.gov.uk'
    }

    const req = request(options, (res) => {
      let response = ''

      res.setEncoding('utf8')

      res.on('data', (chunk) => {
        response += chunk
      })

      res.on('end', () => {
        const data = parseResponse(response)

        if (data instanceof Error) {
          reject(data)
        } else {
          resolve(data)
        }
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.end()

  })
}
