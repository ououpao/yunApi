"use strict";
let sendMail = require('../libs/nodemail').sendMail;
let TaskModel = require("mongoose").model("Task");
let ProjectModel = require("mongoose").model("Project");
exports.create = function*(next) {
    let data = this.request.body,
        projectEntity = null,
        taskEntity = null;
    if (!data.name) {
        this.throw("任务名称不能为空！", 400);
    }
    try {
        projectEntity = yield ProjectModel.findOne({ url: this.params.url }).exec();
        taskEntity = new TaskModel({
            // 标题
            title: data.name,
            // 内容
            content: data.detail,
            // 创建者
            owner: this.passport.user,
            // 指派者
            receiver: data.receiver,
            belongTo: projectEntity,
            // 开始时间
            startTime: new Date(data.startTime),
            // 结束时间
            endTime: new Date(data.endTime),
            // 创建时间
            time: new Date()
        });
        taskEntity = yield taskEntity.save();
        yield projectEntity.update({
            '$push': { 'tasks': taskEntity }
        });
    } catch (err) {
        this.throw(err);
    }
    this.status = 200;
    this.body = { detail: taskEntity };
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
