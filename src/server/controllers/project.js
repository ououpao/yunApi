"use strict";
exports.createProject = function*(next) {
    let Project = require("mongoose").model("Project");
    let project = yield Project.findOne({ name: this.request.body.name }).exec();
    if (!project) {
        try {
            project = new Project({
                name: this.request.body.name,
                detail: this.request.body.detail,
                members: this.request.body.members
            });
            project = yield project.save();
        } catch (err) {
            this.throw(err);
        }
        this.status = 200;
        this.body = { project: project };
    } else {
        this.throw("该项目名称已存在！", 400);
    }
}
