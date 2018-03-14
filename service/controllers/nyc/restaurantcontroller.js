'use strict';

var mongoose = require('mongoose');
var Restaurant = require('../../models/restaurant/restaurantModel')
var logger = require('../../utils/logging/logger')
var inputValidator = require('../../utils/validation/inputvalidator')

exports.findRestaurant = function(req, res) {
    // Validate required input
    var msg = inputValidator.validateIntParam(req.params.restaurantId, 'restaurantId');
    if (msg != '') {
        res.status(400);    // HTTP bad request
        res.send(msg);
        return;
    }

    // Find the restaurant object given the restaurantId
    Restaurant.Collection.findOne({ id : req.params.restaurantId },
        function(err, data) {
        if (err) {
            res.status(500);    // HTTP error
            res.send("There was an error retrieving restuarant details. Please consult logs.");
            logger.error(err);
        }        
        res.json(data);
    });
};

exports.searchByGeocode = function(req, res) {
    // Validate required input
    var msg = inputValidator.validateNumberParam(req.body.range, 'range');
    if (msg != '') {
        res.status(400);    // HTTP bad request
        res.send(msg);
        return;
    }

    msg = inputValidator.validateNumberParam(req.body.latitude, 'latitude');
    if (msg != '') {
        res.status(400);    // HTTP bad request
        res.send(msg);
        return;
    }

    msg = inputValidator.validateNumberParam(req.body.longitude, 'longitude');
    if (msg != '') {
        res.status(400);    // HTTP bad request
        res.send(msg);
        return;
    }

    var range = req.body.range;
    var latitudeHigh = req.body.latitude + range;
    var latitudeLow = req.body.latitude - range;
    var longitudeHigh = req.body.longitude + range;
    var longitudeLow = req.body.longitude - range;
    
    // Search for restaurants by the coordinates and range
    Restaurant.Collection.find({ 
        latitude : { $gte : latitudeLow, $lte : latitudeHigh }, 
        longitude : { $gte : longitudeLow, $lte : longitudeHigh } },
        'id score grade closed latitude longitude',
        function(err, data) {
            if (err) {
                res.status(500);    // HTTP error
                res.send("There was an error searching for restaurants by geocode. Please consult the logs.");
                logger.error(err);
            }        
            res.send(data);
        });
};

exports.searchByAttribute = function(req, res) {
    // Validate the required input
    var msg = inputValidator.validateNumberParam(req.body.page, 'page');
    if (msg != '') {
        res.status(400);    // HTTP bad request
        res.send(msg);
        return;
    }

    msg = inputValidator.validateNumberParam(req.body.pageSize, 'pageSize');
    if (msg != '') {
        res.status(400);    // HTTP bad request
        res.send(msg);
        return;
    }

    var fieldsReturned = 'id name cuisineDescription city zipCode grade closed';
    var queryJson = buildSearchQuery(req.body);

    // search must contain a filter
    if (Object.keys(queryJson).length == 0) {
        res.status(400);    // HTTP bad request
        res.send("Search must contain at least one filter.");
        return;
    }

    Restaurant.Collection.count(queryJson, function(err, count) {
        if (err) {
            res.status(500);    // HTTP error
            res.send("There was an error retrieving number of search results. Please consult logs.");
            logger.error(err);
        }  
        else {
            queryJson = buildSearchQuery(req.body);

            var skip = (req.body.page - 1) * req.body.pageSize;
            var query = Restaurant.Collection.find(queryJson, fieldsReturned)
                .limit(req.body.pageSize)
                .skip(skip);

            query.exec(
                function(err, data) {
                    if (err) {
                        res.status(500);    // HTTP error
                        res.send("There was an error retrieving search results. Please consult logs.");
                        logger.error(err);
                    }  
                    res.send( { data : data, count : count } );
            });
        }
    });
};

function buildSearchQuery(searchParams) {
    var query = {};

    if (searchParams.name != '' && searchParams.name != undefined) {
        var name = searchParams.name.toLowerCase();
        name = name.replace("$", "\\$");
        name = name.replace("*", "\\*");
        name = name.replace("+", "\\+");
        name = name.replace("(", "\\(");
        name = name.replace(")", "\\)");
        name = name.replace("?", "\\?");
        name = name.replace("[", "\\[");
        name = name.replace("]", "\\]");
        name = name.replace("|", "\\|");

        var regExp = new RegExp('^' + name.toLowerCase());
        query['name_lower'] = regExp;
    }

    if (searchParams.zipCode != '' && searchParams.zipCode != undefined) {
        query['zipCode'] = searchParams.zipCode;
    }

    if (searchParams.grade != '' && searchParams.grade != undefined) {
        if (searchParams.grade == 'D')
            query['closed'] = true;
        else if (searchParams.grade == 'Z')
            query['grade'] = { $in: [ 'Z', '' ]};
        else
            query['grade'] = searchParams.grade;
    }

    return query;
}

