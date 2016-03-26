require('babel-core/register')({
  presets: ['es2015-node5'],
  plugins: [
    [ 'transform-react-jsx', { 'pragma': 'h' } ]
  ]
})
require('./src/server/server')
