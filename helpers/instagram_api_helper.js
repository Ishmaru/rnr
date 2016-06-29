var request = require('request');
var locus   = require('locus');
var User = require('../models/user');

function grabLiked(req, res, next) {
  request.get(`https://api.instagram.com/v1/users/self/media/liked?access_token=${req.user.accessToken}`, function(err, response, body) {
    var userData = JSON.parse(body);
    console.log("Grab liked is hit!");
    var likedImgLoc = userData.data.map(imgData => [imgData.images.standard_resolution.url, imgData.location]);
    res.json(likedImgLoc);
  });
}

function grabLatLng(req, res, next, likedId) {
  request.get(`https://api.instagram.com/v1/users/self/media/liked?access_token=${req.user.accessToken}`, function(err, response, body) {
    var loaction = body.response.data.likes[likedId].location.map(function(venue) {
          return {
            lat: location.name,
            lng:  location.url
          };
        })
  })
}


module.exports = {
  grabLiked: grabLiked,
  grabLiked: grabLatLng
}
