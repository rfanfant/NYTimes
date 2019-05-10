// require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// setup heroku & local host ports
var PORT = process.env.PORT || 3000;

// instantiate Express App
var app = express();

// Set up Express Router
var router = express.Router();

require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));


app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));


app.set("view engine", "handlebars");


// use body parser
app.use(bodyParser.urlencoded({extended: false}));

// have every request go through our router middleware
app.use(router);
var db = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoHeadLines";
mongoose.connect(db, function(error){
    if (error){
        console.log(error);
        throw error;
    }
    else {
        console.log("mongoose connection is successful");
    }
});




// connect handlebards to our express app





// Listen on our port(s)
app.listen(PORT, function() { 
    console.log("Listening on port: " + PORT);
});


