"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	// 项目名称
    name: { type: String, required: true, unique: true},
    // 项目url
    url: { type: String, required: true, unique: true},
    // 项目图标
    icon: {type: String, default: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'},
    // 详细描述
    detail: { type: String},
    // 项目成员
    members: { type: Array},
    // 项目所有者
    owner: {type: String, required: true},
    // 是否删除
    isRemove: {type: Boolean, default: false, required: true},
    // 创建时间
    time: {type: Date, default: new Date(), required: true}
});

// Model creation
mongoose.model("Project", ProjectSchema);
