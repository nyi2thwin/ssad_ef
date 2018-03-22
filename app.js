// builtin
var fs = require('fs');
var path = require('path');
var assert = require('assert');

// 3rd party
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');




//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/EFDatabase');

require('./models/User');

var User = mongoose.model('User');

//wipe all user
User.remove({}, function(err,removed) {
	//create 2 user
	(new User({userId:1,type:"AssetsOfficer",password:"EF123!"})).save();
	(new User({userId:2,type:"AssetsCommander",password:"EF123!"})).save();
});


// local
var hbs = require('hbs').create();


var app = express();

// render html files using hbs as well
// tests detecting the view engine extension
app.engine('html', hbs.__express);

// set the view engine to use handlebars
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('link_to', function(context) {
  return "<a href='" + context.url + "'>" + context.body + "</a>";
});

hbs.registerHelper('link_to2', function(title, context) {
  return "<a href='/posts" + context.url + "'>" + title + "</a>"
});


hbs.registerPartials(__dirname + '/templates/layouts');

// expose app and response locals in views
hbs.localsAsTemplateData(app);
app.locals.father = 'Alan';


var ef_api = require('./controllers/myApi');
app.use('/ef_api', ef_api);

var my_cmo_api = require('./controllers/myCMOApi');
app.use('/cmo_api', my_cmo_api);

var my_view = require('./views/view');
app.use('/', my_view);


app.get('/', function(req, res){
	 User.find({}, function(err, users) {
	    if (err)
	      res.send(err);
	    res.send(users);
	});
 	
});




app.use(function(err, req, res, next) {
  res.status(500).send(err.stack.toString());
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))