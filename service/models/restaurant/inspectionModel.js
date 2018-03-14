'use strict';
var mongoose = require('mongoose');
var violationModel = require('./violationModel')

var Schema = mongoose.Schema;
var violationSchema = violationModel.ViolationSchema;

exports.InspectionSchema = new Schema({
    date : Date,
    score : Number,
    grade : String,
    violations : [violationSchema]
});
