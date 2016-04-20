"use strict";
var router = require("koa-router")();
var authController = require("./controllers/auth");

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function(app, passport) {
  // register functions
  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  router.post("/signup", authController.createUser);
  app.use(router.routes());
};
