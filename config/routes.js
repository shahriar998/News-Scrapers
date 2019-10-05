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
}