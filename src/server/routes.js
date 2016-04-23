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
  // router.use(function *(next) {
  //   this.type = "json";
  //   yield next;
  // });

  router.get("/api/auth", authController.getCurrentUser);
  router.post("/api/auth", authController.signIn);
  
  router.all("/api/signout", authController.signOut);
  router.post("/api/signup", authController.createUser);
  app.use(router.routes());
};
