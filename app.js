var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
   
   
   //APP CONFIG================
   
//   mongoose.connect("mongodb://localhost/piyush");
   mongoose.connect("mongodb://Sumit:behaPPYhaha99!@ds145283.mlab.com:45283/piyush_db");
   app.set("view engine", "ejs");
   app.use(express.static("public"));
   app.use(bodyParser.urlencoded({extended: true}));
   
   //MONGOOSE/MODEL CONFIG===========
   
    var aboutSchema = new mongoose.Schema({
        name: String,
        company: String,
        phone: String,
        email: String,
        skype: String,
        message: String,
        created: {type: Date, default: Date.now}
    });
    
    var About = mongoose.model("About", aboutSchema);
    
    // About.create({
    //     name: "Sumit",
    //     company: "Blaze dev",
    //     email: "test@email.com",
    //     skype: "nothere",
    //     message: "Hi there!"
    // });
    
// name 
// company
// phone
// email
// skype
// message
// created

//RESTFUL ROUTES============

//LANDING ROUTE========

app.get("/", function(req, res) {
    res.render("landing");
})

//ABOUTS DISPLAY ROUTE=======

app.get("/abouts", function(req, res){
    About.find({}, function(err, abouts){
        if(err){
            console.log(err)
        } else {
            res.render("index", {abouts:abouts})
        }
    })
    // res.render("index");
});


//CONTACT NEW ROUTE=====

app.get("/abouts/new", function(req, res) {
    res.render("about");
});

//CREATE ROUTE====

app.post("/abouts", function(req, res){
    //create about
    About.create(req.body.about, function(err, newAbout){
        if(err){
            res.render("new");
        } else {
            //redirect
            res.redirect("/abouts");
        }
    })
    
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Piyush server is up")
})