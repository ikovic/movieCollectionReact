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
            "/api/*": "http://localhost:3000/",
            "/auth/*": "http://localhost:3000/"
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
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?\d+)?$/,
                loader: "file-loader"
            },
            {test: /\.(ttf|eot|jpg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?\d+)?$/, loader: "file-loader"},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};

module.exports = config;
