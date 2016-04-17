'use strict';
var fs = require('fs');
var path = require('path');
var koa = require('koa');
var logger = require('koa-logger');
var serve = require('koa-static');
var convert = require('koa-convert');
var send = require('koa-send');
var router = require('koa-router')();
var env = process.argv[2];
var debug = 'dev' == env;
var app = new koa();
var staticPath = path.resolve(__dirname, '../' + (debug ? '../' : '../dist'));
app.use(serve(staticPath));
if (debug) {
    var webpackDevMiddleware = require('koa-webpack-dev-middleware')
    var webpack = require('webpack')
    var webpackConf = require('../../build_config/webpack.dev.config.js');
    var compiler = webpack(webpackConf)

    // 为使用Koa做服务器配置koa-webpack-dev-middleware
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConf.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }))

    // 为实现HMR配置webpack-hot-middleware
    var hotMiddleware = require("webpack-hot-middleware")(compiler);
    // Koa对webpack-hot-middleware做适配
    app.use(function*(next) {
        yield hotMiddleware.bind(null, this.req, this.res);
        yield next;
    });
}
// Logger
app.use(logger());
// app.use(router.routes())
app.use(function*() {
    this.type = 'text/html';
    this.body =  yield send(this, '/index.html');
});

app.listen(3000);
console.log('listening on port 3000...');
