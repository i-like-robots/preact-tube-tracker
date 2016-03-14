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
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT || 8080,
    contentBase: './app'
  }
}
