var webpack = require('webpack');
var express = require('express');
var path = require('path');
var config = require('./webpack.config');
var APP_PORT = 8085;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Serve static resources
app.use('/node_modules', express.static('node_modules'));
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(APP_PORT, function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at http://localhost:' + APP_PORT);
});
