var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public');
var APP_DIR = path.resolve(__dirname, './src/app/');

var config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};

module.exports = config;
