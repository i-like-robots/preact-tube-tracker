export function debounceEvent (callback, wait) {
  let timeout

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, wait)
  }
}

export function httpRequest (url, success, error) {
  const request = new window.XMLHttpRequest()

  request.open('GET', url)

  request.onload = function () {
    if (this.status === 200) {
      success(this.responseText)
    } else {
      error(new Error(this.status))
    }
  }

  request.onerror = function () {
    error(new Error(this.status))
  }

  request.send()
}

export function apiRequestUrl (line, station) {
  return `/api/${line}/${station}`
}

export function formattedTimeUntil (timeTo) {
  const minutes = Math.round(timeTo / 60)
  const seconds = Math.round((timeTo - (minutes * 60)) / 30) * 30
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds > 0 ? seconds : '0'}`
}

export function formatQueryString (props) {
  const queryString = []

  for (const prop in props) {
    if (props.hasOwnProperty(prop) && props[prop] !== null) {
      queryString.push(`${prop}=${props[prop]}`)
    }
  }

  return `?${queryString.join('&')}`
}

export function queryStringProperty (queryString, prop) {
  const pairs = queryString.replace(/^\?/, '').replace(/\/$/, '').split('&')
  const props = {}

  pairs.forEach((pair) => {
    let [ a, b ] = pair.split('=')
    props[a] = b
  })

  return props[prop]
}

export function isLine (line, data) {
  return line in data.lines
}

export function isStation (station, data) {
  return station in data.stations
}

export function isStationOnLine (line, station, data) {
  return isLine(line, data) &&
    isStation(station, data) &&
    data.stationsOnLines[line].indexOf(station) >= 0
}

export function mergeGroupedLines (line, station, data) {
  let lines = [line]

  if (station in data.sharedPlatforms) {
    const lineGroups = data.sharedPlatforms[station].filter(
      (lineGroup) => lineGroup.indexOf(line) > -1
    )

    // Flatten array of arrays
    lines = lines.concat.apply(lines, lineGroups)

    // Remove duplicates
    lines = lines.filter(
      (line, i) => lines.indexOf(line) === i
    )
  }

  return lines
}
