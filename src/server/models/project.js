"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: { type: String, required: true, unique: true},
    detai: { type: String},
    members: { type: Array}
});

// Model creation
mongoose.model("Project", ProjectSchema);
