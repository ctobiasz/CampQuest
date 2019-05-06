var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
  {
  name: "Cloud's Rest",
  image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description: "ddhsajdhasjk"
},
{
  name: "Mesa Paradise",
  image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description: "ddhsajdhasjk"
},
{
  name: "Canyon Floor",
  image: "https://images.unsplash.com/photo-1533086723868-6060511e4168?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description: "ddhsajdhasjk"
}
];

function seedDB(){
  //Remove all campgrounds
  Campground.deleteMany({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text: "This place is great but I wish there was internet",
              author: "Homer Jameson"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
              campground.comments.push(comment);
              campground.save();
              console.log("created a new comment");
            }
          });
        }
      });
    });
  });
  //add a few comments
};

module.exports = seedDB;
