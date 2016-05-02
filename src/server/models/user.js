"use strict";
var bcrypt = require("../libs/bcrypt"); // version that supports yields
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var co = require("co");

var UserSchema = new Schema({
    // 用户名
    username: { type: String, required: true},
    // 密码
    password: { type: String, required: true },
    // 电子邮箱
    email: { type: String, required: true, unique: true },
    // 用户头像
    avatar: {type: String},
    // 好友列表
    friends: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    // 自己创建的项目
    myProjects: [{
        type: Schema.Types.ObjectId, 
        ref: 'Project'
    }],
    // 邀请加入的项目
    inviteProjects: [{
        type: Schema.Types.ObjectId, 
        ref: 'Project'
    }],
    // 注册时间
    time: { type: Date, default: new Date(), required: true}
}, {
    toJSON: {
        transform: function(doc, ret, options) {
            delete ret.password;
        },
    },
});

/**
 * Middlewares
 */
UserSchema.pre("save", function(done) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return done();
    }

    co.wrap(function*() {
        try {
            var salt = yield bcrypt.genSalt();
            var hash = yield bcrypt.hash(this.password, salt);
            this.password = hash;
            done();
        } catch (err) {
            done(err);
        }
    }).call(this).then(done);
});

/**
 * Methods
 */
UserSchema.methods.comparePassword = function*(candidatePassword) {
    return yield bcrypt.compare(candidatePassword, this.password);
};

/**
 * Statics
 */

UserSchema.statics.passwordMatches = function*(email, password) {
    var user = yield this.findOne({ email: email.toLowerCase() }).exec();
    if (!user) {
        throw new Error("没有找到该用户！");
    }
    if (yield user.comparePassword(password)) {
        return user;
    }
    throw new Error("输入的密码不正确！");
};

// Model creation
mongoose.model("User", UserSchema);
