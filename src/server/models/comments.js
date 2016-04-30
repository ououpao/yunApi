"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Comments = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    content: { type: String, required: true},
    time: { type: Date, default: new Date(), required: true}
});

// Model creation
mongoose.model("Comments", Comments);