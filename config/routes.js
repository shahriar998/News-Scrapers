var scrape = require("../script/scrape");
var headlinesC = require("../models/headlines.js");
var notesC = require("../models/notes.js");



module.exports = function (router){
    router.get("/", function(req,res){
        console.log("we hit the slash route!!!")
        res.render("article")
    });

    router.get("/note", function(req,res){
        res.render("note")
    })

    router.get("/api/fetch", function(req, res) {
        // This method inside the headlinesController will try and scrap new articles
      // and save unique ones to the database
      headlinesController.fetch(function(err, docs) {
          // If we don't get any articles back, likely because there are no new
          // unique articles, send this message back to the user
          console.log(docs);
          if (!docs || docs.insertedCount === 0) {
              res.json({
                message: "No new articles today. Check back tomorrow!"
              });
          }
          else if (docs.insertedCount == "undefined") {
              res.json({
                message: "Added new articles!"
              });
          }
          // Otherwise send back a count of how many new articles there are
          else {
              res.json({
                message: "Added " + docs.insertedCount + " new articles!"
              });
          }
      });
    });
    router.get("/api/headlines", function(req, res) {
      // If the client specifies a saved query parameter, ie "/api/headlines/?saved=true"
      // which is translated to just { saved: true } on req.query,
      // then set the query object equal to this
    var query = {};
      if (req.query.saved) {
        query = req.query;
      }
  
      // Run the headlinesController get method and pass in whether we want saved, unsaved,
      // (or all headlines by default)
      headlinesController.get(query, function(data) {
        // Send the article data back as JSON
        res.json(data);
      });
  
    });

    router.delete("/api/headlines/:id", function(req, res) {
      var query = {};
      // Set the _id property of the query object to the id in req.params
      query._id = req.params.id;
  
      // Run the headlinesController delete method and pass in query object containing
      // the id of the headline to be deleted
      headlinesController.delete(query, function(err, data) {
        // Send the result back as JSON to be handled client side
        res.json(data);
      });
    });

    router.get("/api/notes/:headline_id?", function(req, res) {
      // If we are supplied a headline id in req.params, then we will add the id to our query object
      // Otherwise query will remain an empty object and thus return every note
      console.log("get route is hit");
      var query = {};
      if (req.params.headline_id) {
        query._id = req.params.headline_id;
        // console.log(query._id);
      }
      notesController.get(query, function(err, data) {
        if (err) {console.log(err);}
        // Send the note data back to the user as JSON
        // console.log(data);
        res.json(data);
      });
    });
    router.post("/api/notes", function(req, res) {
      // console.log(req.body);
      notesController.save(req.body, function(data) {
        // Send the note to the browser as a json
        res.json(data);
      });
    });
  
    // This route handles deleting a note of a particular note id
    router.delete("/api/notes/:id", function(req, res) {
      var query = {};
      query._id = req.params.id;
  
      // Use the check function from the headlines controller,
      // this checks all of our articles, sorted by id number
      notesController.delete(query, function(err, data) {
        // Send the article data to a json
        res.json(data);
        // console.log(data);
      });
    });
}