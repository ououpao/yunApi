"use strict";
let ProjectModel = require("mongoose").model("Project");
let UserModel = require("mongoose").model("User");
let ApiStore = require("mongoose").model("Api");
exports.createProject = function*(next) {
    let user = this.passport.user;
    if (!this.request.body.name) {
        this.throw("项目名称不能为空！", 400);
    }
    if (!this.request.body.url) {
        this.throw("项目url不能为空！", 400);
    }
    let project = yield ProjectModel.findOne({
        "$or": [{
            name: this.request.body.name
        }, {
            url: this.request.body.url
        }]
    }).exec();
    if (project) {
        this.throw("该项目的名称或URL已存在！", 400);
    } else {
        try {
            project = new ProjectModel({
                name: this.request.body.name,
                url: this.request.body.url,
                detail: this.request.body.detail,
                members: [user],
                owner: user
            });
            project = yield project.save();
            yield UserModel.findOneAndUpdate({
                _id: user._id
            }, {
                '$push': { myProjects: project }
            }, {
                new: true
            }).exec();
        } catch (err) {
            this.throw(err);
        }
        this.status = 200;
        this.body = { project: project };
    }
}
exports.invite = function*(next) {
    let user = this.passport.user;
    let request = this.request.body,
        email = request.email,
        projectUrl = request.projectUrl;
    if (!email) {
        this.throw("邮箱不能为空！", 400);
    }
    let res = yield ProjectModel.update({ url: projectUrl }, { '$push': { 'members': email } }).exec();
    this.status = 200;
    this.body = res;
}
exports.getProjectList = function*(next) {
    let user = this.passport.user;
    let projects = yield ProjectModel.find({ owner: user }).exec();
    this.status = 200;
    this.body = { list: projects };
}
exports.getApiList = function*(next) {
    let projectUrl = this.params.url;
    let project = yield ProjectModel.findOne({ url: projectUrl });
    let apis = yield ApiStore.find({ 'belongTo': project }).exec();
    this.status = 200;
    this.body = { list: apis };
}
exports.getTaskList = function *(next){
    let user = this.passport.user;
    let project = yield ProjectModel.findOne({ owner: user }, {tasks: 1}).populate('tasks').exec();
    this.status = 200;
    this.body = { list: project.tasks };
}
exports.getMemberList = function *(next){
    let user = this.passport.user;
    let project = yield ProjectModel.findOne({ owner: user }, {members: 1}).populate('members').exec();
    this.status = 200;
    this.body = { list: project.members };
}
exports.getDetail = function*(next) {
    let user = this.passport.user;
    let detail;
    try {
        detail = yield ProjectModel.findOne({
            owner: user,
            url: this.request.query.url,
            isRemove: false
        }).exec();
    } catch (err) {
        this.throw(err);
    }
    this.status = 200;
    this.body = { detail: detail };
}
exports.remove = function*(next) {
    let user = this.passport.user;
    let detail = yield ProjectModel.remove({
        owner: user.email,
        _id: this.params.id,
        isRemove: false
    }).exec();
    this.status = 200;
    this.body = {};
}
exports.update = function*(next) {
    let user = this.passport.user;
    let detail = yield ProjectModel.findOneAndUpdate({
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
