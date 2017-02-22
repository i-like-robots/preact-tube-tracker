const webpack = require('webpack')

module.exports = {
  entry: [
    './src/client/bootstrap.js'
  ],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: {
        presets: [ 'es2015' ],
        plugins: [ ['transform-react-jsx', { 'pragma': 'h' }] ]
      } }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  devtool: 'source-map'
}
