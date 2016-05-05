"use strict";
let ProjectModel = require("mongoose").model("Project");
let UserModel = require("mongoose").model("User");
let ApiModel = require("mongoose").model("Api");
let inviteMsgModel = require("mongoose").model("inviteMsg");

exports.create = function*(next) {
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
        this.request.body.members.push(user._id);
        try {
            project = new ProjectModel({
                name: this.request.body.name,
                url: this.request.body.url,
                detail: this.request.body.detail,
                members: this.request.body.members,
                owner: user,
                time: new Date()
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
exports.getDetail = function*(next) {
    let user = this.passport.user;
    let detail;
    try {
        detail = yield ProjectModel.findOne({
            url: this.request.query.url,
            isRemove: false
        }).exec();
    } catch (err) {
        this.throw(err);
    }
    if (detail.members.indexOf(user._id) > -1) {
        this.status = 200;
        this.body = { detail: detail };
    }else{
        this.throw('无权限访问', 401)
    }
}
exports.inviteMember = function*(next) {
    let user = this.passport.user;
    let request = this.request.body,
        email = request.email,
        projectUrl = request.projectUrl;
    if (!email) {
        this.throw("邮箱不能为空！", 400);
    }
    let invitee = yield UserModel.findOne({ email: email }).exec(),
        project = yield ProjectModel.findOne({ url: projectUrl }).exec();
    if (invitee && project) {
        let inviteMsgEntity = new inviteMsgModel({
            invitor: user,
            invitee: invitee,
            project: project,
            time: new Date()
        });
        inviteMsgEntity = yield inviteMsgEntity.save();
        yield invitee.update({
            '$push': {
                inviteMsgs: inviteMsgEntity
            }
        }).exec();
    } else {
        this.throw('没有找到该用户!', 400);
    }
    this.status = 200;
    this.body = {
        status: 'success',
        data: {
            msg: '您的邀请已发送成功!'
        }
    };
}
exports.getProjectList = function*(next) {
    let user = this.passport.user;
    let userEntity = yield UserModel
        .findOne({ _id: user._id })
        .populate('myProjects inviteProjects')
        .exec();
    let myProjects = userEntity.myProjects,
        inviteProjects = userEntity.inviteProjects,
        projects = myProjects.concat(inviteProjects);
    this.status = 200;
    this.body = { list: projects };
}
exports.getApiList = function*(next) {
    let projectUrl = this.params.url;
    let project = yield ProjectModel.findOne({ url: projectUrl });
    let apis = yield ApiModel
        .find({ 'belongTo': project })
        .populate('owner', { _id: 1, username: 1 })
        .exec();
    this.status = 200;
    this.body = { list: apis };
}
exports.getTaskList = function*(next) {
    let user = this.passport.user;
    let project = yield ProjectModel
        .findOne({ owner: user }, { tasks: 1 })
        .populate('tasks')
        .exec();
    this.status = 200;
    this.body = { list: project.tasks };
}
exports.getMemberList = function*(next) {
    let user = this.passport.user;
    let project = yield ProjectModel
        .findOne({ url:  this.params.url}, { members: 1 })
        .populate('members')
        .exec();
    this.status = 200;
    this.body = { list: project.members };
}
