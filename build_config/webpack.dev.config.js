var webpack = require('webpack')
var config = require('./webpack.base')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// eval-source-map is faster for development
config.devtool = 'eval-source-map'
// config.devtool = false
// add hot-reload related code to entry chunks
var polyfill = 'eventsource-polyfill'
var hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true'
Object.keys(config.entry).forEach(function(name, i) {
    var extras = i === 0 ? [polyfill, hotClient] : [hotClient]
    config.entry[name] = extras.concat(config.entry[name])
})
config.output.publicPath = '/'

config.plugins = (config.plugins || []).concat([
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    //将样式统一发布到style.css中
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
        title: 'YUN-API|HOME',
        filename: 'index.html',
        template: 'src/client/index.html',
        inject: true
    })
])

module.exports = config
