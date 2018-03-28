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
    User.findOne({
        username: req.body.username,
        password: req.body.password
    },
    function (err, user) {
        if (err) 
            res.send(err);
        if (user) {
            req.session.regenerate(function(){
                req.session.user = user;
                req.session.success = 'Login successful.';
                console.log(req.session.user);
                console.log(req.session.success);
                if (user.role == 'Commander')
                    res.redirect('/commander');
                else
                    res.redirect('/assetOfficer');
            });

            
        } else {
            res.render("index",{error_message:'Incorrect Login'});
        }
  });
};




