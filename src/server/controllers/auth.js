"use strict";
var passport = require("koa-passport");


exports.createUser = function*() {
    if (!this.request.body) {
        this.throw("注册信息不能为空！", 400);
    }
    if (!this.request.body.username) {
        this.throw("用户名不能为空！", 400);
    }
    if (!this.request.body.password) {
        this.throw("密码不能为空！", 400);
    }
    if (!this.request.body.email) {
        this.throw("电子邮箱不能为空！", 400);
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
    let _this = this;
    yield * passport.authenticate("local", function*(err, user, info) {
        if (err) {
            throw err;
        }
        if (user === false) {
            _this.status = 401;
        } else {
            yield _this.login(user);
            _this.body = { user: user };
        }
    }).call(this);
};
