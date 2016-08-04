var webpack = require('webpack');
var path = require('path');

var config = {
    entry: [
        './src/app/app.js'
    ],
    output: {
        path: __dirname + '/public/dist',
        publicPath: 'dist/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "public",
        proxy: {
            "/api/*": "http://localhost:3000/"
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};

module.exports = config;
