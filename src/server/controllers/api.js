"use strict";
exports.getList = function*(next) {
    let projectUrl = this.params.url;
    let Api = require("mongoose").model("Api");
    let apis = yield Api.find({ belongTo: projectUrl }).exec();
    this.status = 200;
    this.body = { list: apis };
}
exports.getDetail = function*(next) {
    let id = this.params.id;
    let Api = require("mongoose").model("Api");
    let detail = yield Api.findOne({ _id: id }).exec();
    this.status = 200;
    this.body = { detail: detail };
}
exports.create = function*(next) {
    let data = this.request.body,
        projectUrl = this.params.url,
        user = this.passport.user,
        Api = require("mongoose").model("Api"),
        apiEntity = null;
    if (!data.name) {
        this.throw("接口名称不能为空！", 400);
    }
    if (!data.url) {
        this.throw("接口url不能为空！", 400);
    }


    try {
        apiEntity = new Api({
            name: data.name,
            url: data.url,
            method: data.method,
            detail: data.detail,
            members: data.members,
            requestBody: data.requestBody,
            responseBody: data.responseBody,
            owner: this.passport.user.email,
            belongTo: projectUrl
        });
        apiEntity = yield apiEntity.save();
    } catch (err) {
        this.throw(err);
    }
    this.status = 200;
    this.body = { detail: apiEntity };
}
exports.updateApi = function*(next) {}
exports.removeApi = function*(next) {
    let user = this.passport.user;
    let Api = require("mongoose").model("Api");
    let api = yield Api.remove({
        _id: this.params.id,
        isRemove: false
    }).exec();
    this.status = 200;
    this.body = {api: api};
}
