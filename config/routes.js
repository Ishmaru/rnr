var express = require('express');
var router  = new express.Router();
var passport = require('passport');
var request  = require('request');

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var instaHelp       = require('../helpers/instagram_api_helper');

router.get('/', function(req, res, next) {
  if (req.user) {
    console.log("access" + req.user.accessToken);
  };
  res.render('../views/pages/welcome', { user: req.user, apikey: process.env.GOOGLE_API_KEY });
});

router.get('/contact', function(req, res, next) {

  res.render('../views/pages/contact', { user: req.user});
});

// router.get('/contact', pagesController.contact);

router.get('/auth/instagram',
  passport.authenticate('instagram', { scope: ['public_content', 'follower_list']}));

router.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});

// Instagram Helper Routes
router.get('/api/likes', authorize, instaHelp.grabLiked);
router.get('/api/users', authorize, usersController.index);
router.get('/api/users/:id', authorize, usersController.show);
router.put('/api/users/:id', authorize, usersController.update);
router.delete('/api/users/:id', authorize, usersController.destroy);

module.exports = router;

function authorize(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/instagram');
  }
}


