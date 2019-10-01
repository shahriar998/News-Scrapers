var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// Initialize Express
var app = express();

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(__dirname+"/public"));


// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraped_news", { useNewUrlParser: true });
var db = mongoose.connection;

//Connection status
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", function (){
  console.log("Connected to Mongoose!")
})
//Set up Express Router
var router = express.Router();

require ("./config/routes.js")(router);
app.use(router);
// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
