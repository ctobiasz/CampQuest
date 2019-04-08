var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/camp_fire", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//SCHEME SETUP

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"
//
//   }, function(err, campground){
//      if(err){
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND");
//       console.log(campground);
//     }
//   });

app.get("/", (req, res) => {
  res.render("landing")
});

app.get("/campgrounds", (req, res ) => {
  // Get all campgrounds from DB
   Campground.find({}, function(err, allCampgrounds){
     if(err){
       console.log(err);
     } else {
       res.render("campgrounds", {campgrounds:allCampgrounds});
     }
   });
});

app.post("/campgrounds", (req,res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  // Create a new campground and sae to DB
   Campground.create(newCampground, function(err, newlyCreated){
     if(err){
       console.log(err);
     } else {
       //redurect back to campgrounds page
       res.redirect("/campgrounds");
     }
   });
});

app.get("/campgrounds/new", (req,res) => {
  res.render("new.ejs")
})

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("The YelpCamp Has Started!")
});

app.listen(3000,  () => {
console.log("Express server listening on port 3000");
});
