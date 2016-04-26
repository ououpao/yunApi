var path = require('path');
 var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        // 入口文件
        app: './src/client/app.js'
    },
    output: {
        // 输出目录
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: '/static/',
        filename: '[name].min.js',
        chunkFilename: "[name].min.js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel?presets[]=react'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash:7]'
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin("[name].[contenthash].css", {
            allChunks: true,
            disable: false
        })
    ]
}
