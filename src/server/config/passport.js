"use strict";
var LocalStrategy = require("passport-local").Strategy;
var UserStore = require("mongoose").model("User");
var co = require("co");

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
