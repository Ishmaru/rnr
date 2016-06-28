var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user');
var request = require('request');
var locus = require('locus');
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
        if (user.accessToken != accessToken) {
          user.accessToken = accessToken;
          user.save(function(err, user) {
            if (err) return done(err);
            return done(null, user);
          });
        } else {
          console.log("Access Token did not change!");
          return done(null, user);
        }
      };
      var newUser = new User({
        name: profile.displayName,
        instagramId: profile.id,
        accessToken: accessToken
      });
      newUser.save(function(err){
        if (err) { return done(err) };
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
