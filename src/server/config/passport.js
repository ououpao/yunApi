"use strict";
let LocalStrategy = require("passport-local").Strategy;
let UserStore = require("mongoose").model("User");
let co = require("co");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    UserStore.findById(id, done);
  });
  passport.use(new LocalStrategy(function(email, password, done) {
    co(function*() {
      try {
        return yield UserStore.passwordMatches(email, password);
      } catch (ex) {
        done(ex, null);
      }
    }).then(function(user) {
      done(null, user);
    });
  }));
};
