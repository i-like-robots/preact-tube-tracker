import { h, render } from 'preact'
import networkData from '../common/data'
import TubeTracker from '../component/tube-tracker'

window.app = (() => {
  const requiredFeatures = {
    'JSON decoding': window.JSON,
    'the selectors API': document.querySelector,
    'ES5 array methods': Array.prototype.forEach,
    'DOM level 2 events': window.addEventListener,
    'the HTML5 history API': window.history.pushState
  }

  for (const feature in requiredFeatures) {
    if (typeof requiredFeatures[feature] === 'undefined') {
      return alert(`Sorry, but your browser does not support ${feature} so this app won't work properly.`)
    }
  }

  const mount = document.getElementById('app')
  const initialData = JSON.parse(document.getElementById('initial').innerHTML)

  return render(
    <TubeTracker networkData={networkData} initialData={initialData} />,
    mount, mount.firstChild
  )
})()
