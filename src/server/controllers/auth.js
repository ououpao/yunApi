"use strict";
var passport = require("koa-passport");

exports.signIn = function*() {
    var _this = this;
    yield * passport.authenticate("local", function*(err, user) {
        if (!!err) {
            _this.throw(err, 400);
        }
        if(user){
           yield _this.login(user);
            _this.body = { user: user }; 
        }
    }).call(this);
};

exports.signOut = function*() {
    this.logout();
    this.session = null;
    this.status = 204;
};

exports.createUser = function*(next) {
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

    var user = yield User.findOne({ email: this.request.body.email }).exec();
    if (!user) {
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
        this.status = 200;
        this.body = { user: user };
    } else {
        this.throw("该邮箱已存在！", 400);
    }
};

exports.getCurrentUser = function*() {
    if (this.passport.user) {
        this.body = { user: this.passport.user };
    }
    this.status = 200;
};
