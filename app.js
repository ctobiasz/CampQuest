var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
  {name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
  {name: "Mountain Peak Top", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
]

app.get("/", (req, res) => {
  res.render("landing")
});

app.get("/campgrounds", (req, res ) => {
  //
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req,res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  // get data from form and add to campgrounds array
  //redurect back to campgrounds page
  res.redirect("/campgrounds");
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
