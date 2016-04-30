"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApiSchema = new Schema({
    name: { type: String, required: true},
    url: { type: String, required: true},
    method: { type: String, required: true}, 
    detail: { type: String},
    members: { type: Array},
    requestBody: {type: Array},
    responseBody: {type: Array},
    owner: {type: String, required: true},
    comments: {type: Array},
    belongTo: {type: String, required: true},
    isRemove: {type: Boolean, default: false, required: true},
    time: {type: Date, default: new Date(), required: true}
});

// Model creation
mongoose.model("Api", ApiSchema);