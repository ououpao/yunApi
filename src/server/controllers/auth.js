"use strict";
var passport = require("koa-passport");
require('../models/user');

exports.createUser = function *() {
  console.log(this.request)
  if (!this.request.body) {
    this.throw("The body is empty", 400);
  }

  if (!this.request.body.username) {
    this.throw("Missing username", 400);
  }
  if (!this.request.body.password) {
    this.throw("Missing password", 400);
  }

  var User = require("mongoose").model("User");

  try {
    var user = new User({ 
      username: this.request.body.username,
      password: this.request.body.password,
      email: this.request.body.email 
    });
    user = yield user.save();
    // yield this.login(user);
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { user: this.passport.user };
};
