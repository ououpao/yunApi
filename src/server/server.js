'use strict'
let fs = require('fs')
let path = require('path')
let koa = require('koa')
let session = require("koa-generic-session")
let logger = require('koa-logger')
let serve = require('koa-static')
let convert = require('koa-convert')
let send = require('koa-send')
let router = require('koa-router')()
let passport = require("koa-passport")
let bodyParser = require("koa-bodyparser")
let MongoStore = require("koa-sess-mongo-store")
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development"
let debug = env == 'development'
let port = debug ? 8085 : 8086
// let debug = true
let app = new koa()
let staticPath = path.resolve(__dirname, '../' + (debug ? '../' : '../dist'))
app.use(serve(staticPath))
// start mongodb
require('./config/mongo')
// session config
app.keys = ['secret', 'key']
app.use(bodyParser())
app.use(session({
  key: "mkrn.sid"
}))
// models
require('./models')
// passport config
require("./config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())

// Routes
require("./routes")(app)
// spa config
// app.use(function*() {
//   this.type = 'text/html'
//   this.body = yield send(this, '/index.html')
// })
app.listen(port)
console.log(`------server start success on port: ${port}------`)
