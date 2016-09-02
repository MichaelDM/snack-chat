const webpack = require('webpack');
// const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
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
    loaders: [
      {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.styl$/,
      loaders: ['style', 'css?modules', 'stylus'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      // loader: extractTextWebpackPlugin.extract({
      //   fallbackLoader: 'style-loader',
      //   loader: 'css-loader'
      // })
      loader: 'style!css?modules',
    },
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new extractTextWebpackPlugin('styles.css'),
  ],
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: './'
  // }
};
