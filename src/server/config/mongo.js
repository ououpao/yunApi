"use strict";
let mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mkrn');
mongoose.connection.on("error", function(err) {
  console.log(err);
});
mongoose.connection.on("open", function() {
  console.log("------mongodb connect seccess!------");
});