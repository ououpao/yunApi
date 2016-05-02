"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Comments = new Schema({
	// 评论者id
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    belongTo: {
        type: Schema.Types.ObjectId, 
        ref: 'Api'
    },
    // 评论内容
    content: { type: String, required: true },
    // 评论时间
    time: { type: Date, default: new Date(), required: true }
});

// Model creation
mongoose.model("Comments", Comments);
