'use strict';
module.exports = function(app) {
  var controller = require('../../controllers/nyc/restaurantcontroller');

  // Define routes
  // Get restaurant inspection details by ID
  app.route('/nyc/restaurant/:restaurantId')
    .get(controller.findRestaurant)

  // Search by geocode
  app.route('/nyc/restaurant/searchbygeocode')
    .post(controller.searchByGeocode)

  // Search by restaurant attribute
  app.route('/nyc/restaurant/searchbyattribute')
    .post(controller.searchByAttribute)

};

