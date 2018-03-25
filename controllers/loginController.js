'use strict';
var mongoose = require('mongoose'),
	User = mongoose.model('User');


exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.check_login = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId,}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


