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
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'], query: {
        presets: 'es2015-webpack',
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
