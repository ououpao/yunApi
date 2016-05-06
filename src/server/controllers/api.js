"use strict";
let sendMail = require('../libs/nodemail').sendMail;
let ApiModel = require("mongoose").model("Api");
let ProjectModel = require("mongoose").model("Project");
exports.getDetail = function*(next) {
    let id = this.params.id;
    let detail = yield ApiModel
        .findOne({ _id: id })
        .populate({
            path: 'comments',
            select: 'content time user',
            model: 'Comments',
            options: { sort: { time: -1 } }

        })
        .populate({
            path: 'owner',
            select: '_id username',
            model: 'User'
        })
        .exec();
    this.status = 200;
    this.body = { detail: detail };
}
exports.create = function*(next) {
    let data = this.request.body,
        projectUrl = this.params.url,
        user = this.passport.user,
        Api = require("mongoose").model("Api"),
        projectEntity = null,
        apiEntity = null;
    if (!data.name) {
        this.throw("接口名称不能为空！", 400);
    }
    if (!data.url) {
        this.throw("接口url不能为空！", 400);
    }
    try {
        projectEntity = yield ProjectModel.findOne({ url: projectUrl }).exec();
        apiEntity = new Api({
            name: data.name,
            url: data.url,
            method: data.method,
            detail: data.detail,
            members: data.members,
            requestBody: data.requestBody,
            responseBody: data.responseBody,
            owner: this.passport.user,
            belongTo: projectEntity,
            time: new Date()
        });
        apiEntity = yield apiEntity.save();
        yield projectEntity.update({
            '$push': { 'apis': apiEntity }
        });
    } catch (err) {
        this.throw(err);
    }
    this.status = 200;
    this.body = { detail: apiEntity };
    sendMail('570453516@qq.com', '测试', `<a href="http://localhost:3000/#/login?invite=${apiEntity.belongTo}">点击注册</a>`)
}
exports.update = function*(next) {
    let data = this.request.body,
        _id = this.params.id,
        user = this.passport.user,
        Api = require("mongoose").model("Api"),
        projectEntity = null,
        apiEntity = null;
    if (!data.name) {
        this.throw("接口名称不能为空！", 400);
    }
    if (!data.url) {
        this.throw("接口url不能为空！", 400);
    }
    try {
        apiEntity = yield ApiModel.findOneAndUpdate({
                _id: _id
            }, {
                name: data.name,
                url: data.url,
                method: data.method,
                detail: data.detail,
                members: data.members,
                requestBody: data.requestBody,
                responseBody: data.responseBody,
            }, {
                new: true
            })
            .populate('belongTo')
            .exec();
    } catch (err) {
        this.throw(err);
    }
    this.status = 200;
    this.body = { detail: apiEntity };
}
exports.remove = function*(next) {
    let user = this.passport.user;
    let Api = require("mongoose").model("Api");
    let api = yield Api.remove({
        _id: this.params.id,
        isRemove: false
    }).exec();
    this.status = 200;
    this.body = { api: api };
}
exports.addComment = function*(next) {
    let CommentsStore = require("mongoose").model("Comments");
    let user = this.passport.user;
    let apiEntity = yield ApiModel.findOne({ _id: this.params.id }).exec();
    let commentEntity = new CommentsStore({
        user: this.passport.user,
        belongTo: apiEntity,
        content: this.request.body.comment,
        time: new Date()
    });
    commentEntity = yield commentEntity.save();
    yield apiEntity.update({
        '$push': {
            'comments': commentEntity
        }
    });
    this.status = 200;
    this.body = {
        status: 'success',
        data: {
            comment: commentEntity
        }
    }
}
