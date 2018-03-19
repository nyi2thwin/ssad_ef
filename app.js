// builtin
var fs = require('fs');
var path = require('path');
var assert = require('assert');

// 3rd party
var express = require('express');
var request = require('request');

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
  var template_data = {title : 'EF | Home'}
  res.render('index', template_data);
});




app.use(function(err, req, res, next) {
  res.status(500).send(err.stack.toString());
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))