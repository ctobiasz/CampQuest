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
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water, Beautiful granite!"
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

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res ) => {
  // Get all campgrounds from DB
   Campground.find({}, function(err, allCampgrounds){
     if(err){
       console.log(err);
     } else {
       res.render("index", {campgrounds:allCampgrounds});
     }
   });
});
//CREATE - add new campground to DB
app.post("/campgrounds", (req,res) => {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
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
//NEW  - show form to create new campground
app.get("/campgrounds/new", (req,res) => {
  res.render("new.ejs")
});
// SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  //find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});




app.listen(process.env.PORT, process.env.IP, () => {
  console.log("The YelpCamp Has Started!")
});

app.listen(3000,  () => {
console.log("Express server listening on port 3000");
});
