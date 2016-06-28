var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user');
var request = require('request');

// arbitrary comment

passport.use(new InstagramStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URI
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    if (!accessToken) return done(err);
    User.findOne({ instagramId: profile.id}, function(err, user){
      if (err)  { return done(err) };
      if (user) {
        console.log("User Found!")
        user.accessToken = accessToken;
        // grabLiked(accessToken);
        console.log(user);
        return done(null, user);
      };
      var newUser = new User({
        name: profile.displayName,
        instagramId: profile.id
      });
      newUser.save(function(err){
        if (err) { return done(err) };
        newUser.accessToken = accessToken;
        return done(null, newUser);
      });
    });
  }
));

// configure serializeUser
// putting user id in session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// configure deserializeUser
// finds user via session id
// and attaches it to req
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    // console.log(user);
    done(err, user);
  });
});

// function grabLiked(token) {
//   request.get(`https://api.instagram.com/v1/users/self/media/liked?access_token=${token}`, function(err, response, body) {
//     var userData = JSON.parse(body);
//     // user.userData = JSON.parse(body);
//     console.log(userData.data);
//     return userData;
//   });
// }


// module.exports = {
//   grab: grabLiked
// }
