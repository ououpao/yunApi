'use strict';
let fs = require('fs');
let path = require('path');
let koa = require('koa');
let mongoose = require('mongoose');
let logger = require('koa-logger');
let serve = require('koa-static');
let convert = require('koa-convert');
let send = require('koa-send');
let router = require('koa-router')();
let passport = require("koa-passport");
let bodyParser = require("koa-bodyparser");
let env = process.argv[2];
// let debug = 'dev' == env;
let debug = true;
let app = new koa();
let staticPath = path.resolve(__dirname, '../' + (debug ? '../' : '../dist'));
app.use(serve(staticPath));
if (debug) {
    let webpackDevMiddleware = require('koa-webpack-dev-middleware')
    let webpack = require('webpack')
    let webpackConf = require('../../build_config/webpack.dev.config.js');
    let compiler = webpack(webpackConf)

    // 为使用Koa做服务器配置koa-webpack-dev-middleware
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConf.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }))

    // 为实现HMR配置webpack-hot-middleware
    let hotMiddleware = require("webpack-hot-middleware")(compiler);
    // Koa对webpack-hot-middleware做适配
    app.use(function*(next) {
        yield hotMiddleware.bind(null, this.req, this.res);
        yield next;
    });
}
mongoose.connect('mongodb://localhost/mkrn');
mongoose.connection.on("error", function(err) {
  console.log(err);
});
// Logger
app.use(bodyParser());
app.use(logger());
// app.use(router.routes())
// Routes
require("./routes")(app, passport);
app.use(function*() {
    this.type = 'text/html';
    this.body =  yield send(this, '/index.html');
});

app.listen(3000);
console.log('listening on port 3000...');
