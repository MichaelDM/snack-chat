const webpack = require('webpack');
const express = require('express');
const app = express();
const config = require ('../build/webpack.config.dev.js');
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  silent: true,
  noInfo: true,
  stats: false,
  historyApiFallback: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3001, function() {
  console.log('dev server is running on port 3001');
});
