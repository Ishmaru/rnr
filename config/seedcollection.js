var mongoose = require('./database');

var Collection = require('../models/collection');

var collections = [
  { // 0
  link:             "https://www.instagram.com/p/BF-pvvotBwO/?taken-by=jcandeli",
  username:         "jcandeli",
  likes:            19,
  url:              "http://www.lamag.com/wp-content/uploads/sites/9/2015/10/Button-Mash1.jpg",
  location:         {
                      name: "Button Mash",
                      lat: "-118.243685"
                      lng: "-118.243685"
  },
];

Collection.remove({}, function(err) {
  if (err) console.log(err);
  Collection.create(collections, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + collections.length  + " collections.");
      mongoose.connection.close(function(err) {
        if (err) console.log(err);
        process.exit(0);
      });
    }
  });
});
