// Require request and cheerio, to make scrapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    // Use the request package to take in the body of the page's html
   request("https://www.nytimes.com/", function(err, res, body) {
       // body is the actual HTML on the page. Load this into cheerio
       console.log("scraping");
         // Saving this to $ creates a virtual HTML page we can minipulate and
         // traverse with the same methods as jQuery
         var $ = cheerio.load(body);

         // An empty array to save article info
         var articles = [];

         // Find and loop through each article element that has the "latest-container" id
         $(".css-8atqhb").each(function(i, element) {
           // grab the heading text of each article
           var head = $(this).children(".css-n2blzn esl82me0").text().trim();
           // grab the summary of each article
           var sum = $(this).children(".css-1pfq5u e1n8kpyg0").text().trim();
           // grab the link of each article
           var lnk = $(this).children(".css-6p6lnl").children("a").attr("href");
           // console.log(img);
             // So long as headline and sum aren't empty or undefined, do the following
             if (head && sum && lnk && img) {

               // This section uses regular expressions and the trim function to tidy the headlines and summaries
               // Removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
               var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
               var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

               // Initialize an object we will push to the articles array
               var dataToAdd = {
                 headline: headNeat,
                 summary: sumNeat,
                 link: lnk,
                 
               };

               console.log(dataToAdd);

               articles.push(dataToAdd);
             }
       });
       // After loop is complete, send back the array of articles to the callback function
       cb(articles);
   });
};


// Export the function, so other files in the backend can use it
module.exports = scrape;
