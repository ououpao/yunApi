'use strict';
let fs = require('fs');
let path = require('path');
let koa = require('koa');
let mongoose = require('mongoose');
let session = require("koa-generic-session");
let logger = require('koa-logger');
let serve = require('koa-static');
let convert = require('koa-convert');
let send = require('koa-send');
let router = require('koa-router')();
let passport = require("koa-passport");
let bodyParser = require("koa-bodyparser");
let MongoStore = require("koa-sess-mongo-store");
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
let debug = env == 'development';
let port = debug ? 8085 : 8086;
// let debug = true;
let app = new koa();
app.keys = ['secret', 'key'];
let staticPath = path.resolve(__dirname, '../' + (debug ? '../' : '../dist'));
app.use(serve(staticPath));

mongoose.connect('mongodb://localhost/mkrn');
mongoose.connection.on("error", function(err) {
    console.log(err);
});
mongoose.connection.on("open", function () {
    console.log("------mongodb connect seccess!------");
});

// models
require('./models/user');
require('./models/project');
require('./models/api');
require('./models/task');
require('./models/comments');
require('./models/inviteMsg');

// session config
app.use(bodyParser());
app.use(session({
    key: "mkrn.sid"
}));

// passport config
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes")(app, passport);

// spa config
app.use(function*() {
    this.type = 'text/html';
    this.body = yield send(this, '/index.html');
});


app.listen(port);
console.log(`------server start success on port: ${port}------`);
