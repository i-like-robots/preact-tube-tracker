import express from 'express'
import api from './api'
import bootstrap from './bootstrap'

// Start a new app
const app = express()

// API proxy
app.get('/api/:line/:station', (req, res) => {
  api(req.params.line, req.params.station)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(err.status || 500).send(err.toString())
    })
})

// Serve initial HTML
app.get('/', (req, res) => {
  api(req.query.line, req.query.station)
    .then((data) => {
      return bootstrap(data).then((html) => {
        res.send(html)
      })
    })
    .catch((err) => {
      res.status(err.status || 500).send(err.toString())
    })
})

// Static assets
app.use(express.static('./public'))

const port = process.env.PORT || 8080

app.listen(port)

console.log(`Running server on port ${port}, press ctrl + c to stop.`)
