const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    },{
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(['style-loader', 'css-loader', 'stylus-loader']),
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style!css'
    },
  ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      }
    }),
    new webpack.DefinePlugin({
        'process.env': JSON.stringify({ 'NODE_ENV' : 'production' }),
        '__DEV__': false,
        '__PROD__': true,
    }),
  ],
};
