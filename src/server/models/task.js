"use strict"
let mongoose = require("mongoose")
let Schema = mongoose.Schema

let Task = new Schema({
  // 标题
  title: { type: String, required: true },
  // 内容
  content: { type: String, required: true },
  // 创建者
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // 指派者
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  belongTo: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  // 开始时间
  startTime: { type: Date, default: new Date(), required: true },
  // 结束时间
  endTime: { type: Date, default: new Date(), required: true },
  // 创建时间
  time: { type: Date, required: true }
})

// Model creation
mongoose.model("Task", Task)
