"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApiSchema = new Schema({
    // 标题名称
    name: { type: String, required: true},
    // 请求url
    url: { type: String, required: true},
    // 请求方法
    method: { type: String, required: true}, 
    // 详细内容
    detail: { type: String},
    // 请求参数
    requestBody: {type: Array},
    // 响应模板
    responseBody: {type: Array},
    // 无操作权限成员
    members: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    // 创建者
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    // 评论列表
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comments'
    }],
    // 所属项目
    belongTo: {
        type: Schema.Types.ObjectId, 
        ref: 'Project'
    },
    // 是否删除
    isRemove: {type: Boolean, default: false, required: true},
    // 创建时间
    time: {type: Date, required: true}
});

// Model creation
mongoose.model("Api", ApiSchema);