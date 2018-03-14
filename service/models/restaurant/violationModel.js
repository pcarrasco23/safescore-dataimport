'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ViolationSchema = new Schema({ 
    code : String,
    description : String,
    criticalFlag : Boolean
});