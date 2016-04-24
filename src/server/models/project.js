"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: { type: String, required: true, unique: true},
    url: { type: String, required: true, unique: true},
    icon: {type: String, default: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'},
    detail: { type: String},
    members: { type: Array},
    owner: {type: String, required: true},
    isRemove: {type: Boolean, default: false, required: true},
    createDate: {type: Date, default: new Date(), required: true}
});

// Model creation
mongoose.model("Project", ProjectSchema);
