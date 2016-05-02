"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var inviteMsg = new Schema({
	// 邀请者
    invitor: {type: Object, require: true},
    // 被邀请者
    invitee: {type: Object, require: true},
    // 项目
    project: {type: Object, require: true},
    //  
    isTimeout: { type: Boolean, default: false},
    // 评论时间
    time: { type: Date, default: new Date()}
});

// Model creation
mongoose.model("inviteMsg", inviteMsg);
