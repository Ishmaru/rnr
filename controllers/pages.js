var welcome = function(req, res, next) {
  res.render('pages/welcome');
  Collection.find({}, function(err, collections){
    if (err) {
      res.json({message: err});
    } else {
      res.render('users/index', {collections: collections});
    }
  })
};

module.exports = {
  welcome: welcome
};
