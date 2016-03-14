import render from 'preact-render-to-string'
import { h } from 'preact'
import networkData from '../common/data'
import template from '../server/template'
import TubeTracker from '../component/tube-tracker'

export default (data) => {
  const app = render(
    <TubeTracker networkData={networkData} initialData={data} />
  )

  return template('../view/index.html', { app, data: JSON.stringify(data) })
}
