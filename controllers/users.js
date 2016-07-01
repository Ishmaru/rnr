var User = require('../models/user');


function index(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
    }
    res.json(users);
  })
}

function show(req, res, next) {
  var id = req.params.id;
  User.findById(id, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

function update(req, res, next) {
  var id = req.params.id;

  User.findById(id, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (req.body.name) user.name = req.body.name;
    user.save(function(err, updatedUser) {
      if (err) {
        res.send(err);
      }
      console.log('name has been changed');
      res.json(updatedUser);
    });
  });
}

var destroy = function(req, res) {
  var id = req.params.id;

  User.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({message: 'Deleted'});
  });
}

module.exports = {
  index: index,
  show: show,
  update: update,
  destroy: destroy
}
