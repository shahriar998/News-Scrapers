module.exports = function (router){
    router.get("/", function(req,res){
        res.render("article")
    });

    router.get("/note", function(req,res){
        res.render("note")
    })
}