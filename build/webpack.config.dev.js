const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: [
      'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://localhost:3001/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.styl$/,
      loaders: ['style', 'css?modules', 'stylus'],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: './'
  // }
};
