var mongoose = require('./database');

var Collection = require('../models/collection');
var User = require('../models/user');

var users = [
  { // 0
  name:        "Adrian",
  email:       "adrian.delpha@gmail.com",
  address:     "1933 South Broadway, 11th Floor, Los Angeles, CA 90007"
  }
];

// remove any fish or users in the database
Collection.remove({}, function(err) {
  if (err) console.log(err);

  User.remove({}, function(err) {
    if (err) console.log(err);

    // create users
    User.create(users, function(err, users) {

      var collections = [{

        name:   "Arizona",
        user:   users[0]._id,
        photos: [
                { // 0
                  link:             "https://www.instagram.com/p/BG4wrr9EAYr/?taken-by=grandcanyonnps",
                  username:         "grandcanyonnps",
                  likes:            6236,
                  url:              "http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg",
                  location:         {
                                      name: "Button Mash",
                                      lat: "-118.243685",
                                      lng: "34.052234"
                                    }
                }
                ]
      }]

      // create default collection
      Collection.create(collections, function(err, collections) {

        if (err) {
          console.log(err);
        } else{
          console.log(`Database seeded with ${users.length} users and ${collections.length} collections`);

          // disconnect db
          mongoose.disconnect();
        }

      });
    });
  });
});
