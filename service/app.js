var express = require('express');
var app = express();  
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/nyc/restaurantroutes'); //importing route
var registerRestaurantSchemaTask = require('./models/restaurant/restaurantModel');
var logger = require('./utils/logging/logger');

app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nycinspections', { useMongoClient: true }); 
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//support parsing of application/json type post data
app.use(bodyParser.json());

//register the route
routes(app);

//Initialize logging file
logger.addFile({
    level: 'info',
    filename: './app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    colorize: false
});

app.listen(port);

console.log('SafeScore RESTful API server started on: ' + port);
