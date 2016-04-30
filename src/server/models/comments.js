"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Comments = new Schema({
	// 评论者id
    user_id: { type: String, required: true },
    // 评论内容
    content: { type: String, required: true },
    // 评论时间
    time: { type: Date, default: new Date(), required: true }
});

// Model creation
mongoose.model("Comments", Comments);
