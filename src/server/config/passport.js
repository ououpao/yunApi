"use strict";
var LocalStrategy = require("passport-local").Strategy;
var User = require("mongoose").model("User");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, done);
    });
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            // done()有三种用法：
            // 1. 当发生系统级异常时，返回done(err)，这里是数据库查询出错，一般用next(err)，但这里用done(err)，两者的效果相同，都是返回error信息；
            // 2.当验证不通过时，返回done(null, false, message)，这里的message是可选的，可通过express-flash调用；
            // 3.当验证通过时，返回done(null, user)。
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: '用户名不存在.' });
            }
            if (!User.passwordMatches(password)) {
                return done(null, false, { message: '密码不匹配.' });
            }
            return done(null, user);
        });
    }));
};
