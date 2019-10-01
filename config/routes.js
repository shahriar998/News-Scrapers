module.exports = function (router){
    router.get("/", function(req,res){
        console.log("we hit the slash route!!!")
        res.render("article")
    });

    router.get("/note", function(req,res){
        res.render("note")
    })
}