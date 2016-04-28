"use strict";
exports.createProject = function*(next) {

    if (!this.request.body.name) {
        this.throw("项目名称不能为空！", 400);
    }
    if (!this.request.body.url) {
        this.throw("项目url不能为空！", 400);
    }

    let user = this.passport.user;
    let Project = require("mongoose").model("Project");
    let project = yield Project.findOne({ "$or": [{ name: this.request.body.name }, { url: this.request.body.url }] }).exec();
    if (!project) {
        try {
            project = new Project({
                name: this.request.body.name,
                url: this.request.body.url,
                detail: this.request.body.detail,
                members: this.request.body.members,
                owner: user.email
            });
            project = yield project.save();
        } catch (err) {
            this.throw(err);
        }
        this.status = 200;
        this.body = { project: project };
    } else {
        this.throw("该项目的名称或URL已存在！", 400);
    }
}
exports.getALl = function*(next) {
    let user = this.passport.user;
    let Project = require("mongoose").model("Project");
    let projects = yield Project.find({ owner: user.email }).exec();
    this.status = 200;
    this.body = { list: projects };
}
exports.getDetail = function*(next) {
    let user = this.passport.user;
    let Project = require("mongoose").model("Project");
    let detail = yield Project.findOne({
        owner: user.email,
        url: this.request.query.url,
        isRemove: false
    }).exec();
    this.status = 200;
    this.body = { detail: detail };
}
exports.remove = function*(next) {
    let user = this.passport.user;
    let Project = require("mongoose").model("Project");
    let detail = yield Project.remove({
        owner: user.email,
        _id: this.params.id,
        isRemove: false
    }).exec();
    this.status = 200;
    this.body = {};
}
exports.update = function*(next) {
    let user = this.passport.user;
    let Project = require("mongoose").model("Project");
    let detail = yield Project.findOneAndUpdate({
        _id: this.params.id,
    }, {
        name: this.request.body.name,
        url: this.request.body.url,
        detail: this.request.body.detail,
        members: this.request.body.members,
        owner: user.email
    }, { new: true }).exec();
    this.status = 200;
    this.body = { detail: detail };
}