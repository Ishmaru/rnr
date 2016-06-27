var express = require('express');
var router  = new express.Router();
var passport = require('passport');

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');

// root path:
// router.get('/', pagesController.welcome);

// users resource paths:
// router.get('/users',     usersController.index);
// router.get('/users/:id', usersController.show);

router.get('/', function(req, res, next) {
  res.render('../views/pages/welcome', { user: req.user });
});

router.get('/auth/instagram',
  passport.authenticate('instagram'));

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



module.exports = router;
