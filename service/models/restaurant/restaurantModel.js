'use strict';
var mongoose = require('mongoose');
var inspectionModel = require('./inspectionModel')

var Schema = mongoose.Schema;
var inspectionSchema = inspectionModel.InspectionSchema;

var restaurantSchema = new Schema({
    id : Number,
    name : String,
    name_lower: String,
    streetAddress : String,
    city : String,
    state : String,
    zipCode : String,
    phoneNumber : String,
    cuisineDescription : String,
    score: Number,
    grade: String,
    closed: Boolean,
    latitude: Number,
    longitude: Number,
    inspections : [inspectionSchema]
}, { id: false });

exports.Collection = mongoose.model('restaurants', restaurantSchema);