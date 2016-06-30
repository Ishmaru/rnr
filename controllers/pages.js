var welcome = function(req, res, next) {
  res.render('pages/welcome');
};

var contact = function(req, res, next) {
  res.render('pages/contact');
};


module.exports = {
  welcome: welcome,
  contact: contact
};
