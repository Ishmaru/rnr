var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user');

passport.use(new InstagramStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URI
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({ instagramId: profile.id}, function(err, user){
      if (err)  { return done(err) };
      if (user) { return done(null, user)};
      var newUser = new User({
        name: profile.displayName,
        instagramId: profile.id
      });
        console.log(newUser);
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
    done(err, user);
  });
});
