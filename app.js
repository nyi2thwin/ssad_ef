// builtin
var fs = require('fs');
var path = require('path');
var assert = require('assert');

// 3rd party
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser')

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/EFDatabase');

require('./models/User');
require('./models/Asset');
require('./models/IncidentReport');

var User = mongoose.model('User');
var Asset = mongoose.model('Asset');
var IncidentReport = mongoose.model('IncidentReport');


//controller
var LoginController = require('./controllers/loginController')
var reportController = require('./controllers/reportController')

//populating dummy data
//wipe all user
User.remove({}, function(err,removed) {
	//create 2 user
	(new User({username:"user1",role:"AssetsOfficer",password:"123123123"})).save();
	(new User({username:"user2",role:"Commander",password:"123123123"})).save();
});

//wipe all assets
Asset.remove({}, function(err,removed) {
	//create sample assets
	(new Asset({assetType:"fireman",availableUnit:200,totalUnit:200})).save();
	(new Asset({assetType:"soldier",availableUnit:200,totalUnit:200})).save();
	(new Asset({assetType:"police",availableUnit:200,totalUnit:200})).save();
});

//wipe all reports
IncidentReport.remove({}, function(err,removed) {
  //create sample assets
  (new IncidentReport({
                        caseId: 1001,
                        location:  {
                            name: "Bukit",
                            latitude:  12.1,
                            longitude: 80.33
                        },
                        incidentType:["Earthquake"],
                        affectedArea:300,
                        injuryCount:"50",
                        casualtyCount:"100",
                        incidentDateTime:Date.now(),
                        description:"Big and serious incident",
                        status:"Closed",
                        updateLog: [{
                          description:"Update situation",
                          updatedTime: Date.now()
                        },{
                          description:"More injury and casualty",
                          updatedTime: Date.now()
                        }],
                        assignedAssets:[{
                                          assetType: "fireman",
                                          assignedCount: 10,
                                          dateTime:Date.now()
                                        },{
                                          assetType: "police",
                                          assignedCount: 5,
                                          dateTime:Date.now()
                                        }]
                      })).save();
  (new IncidentReport({
                        caseId: 1002,
                        location:  {
                            name: "Bukit",
                            latitude:  12.1,
                            longitude: 80.33
                        },
                        incidentType:["Tsunami"],
                        affectedArea:300,
                        injuryCount:"50",
                        casualtyCount:"100",
                        incidentDateTime:Date.now(),
                        description:"Big and serious water wavess",
                        status:"Closed",
                        updateLog: [{
                          description:"Update situation",
                          updatedTime: Date.now()
                        },{
                          description:"More injury and casualty",
                          updatedTime: Date.now()
                        }],
                        assignedAssets:[{
                                          assetType: "fireman",
                                          assignedCount: 10,
                                          dateTime:Date.now()
                                        },{
                                          assetType: "police",
                                          assignedCount: 5,
                                          dateTime:Date.now()
                                        }]
                      })).save();
});
//end of dummy data



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

//app.use(cookieParser);
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'EF Secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !true }
}));

app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    res.locals.user = req.session.user;
    if (err) res.locals.message = '<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong>'+err+'</div>';
    if (msg) res.locals.message = '<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> login successful.</div>'
    next();
});


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


hbs.registerHelper('link_to', function(context) {
  return "<a href='" + context.url + "'>" + context.body + "</a>";
});

hbs.registerHelper('link_to2', function(title, context) {
  return "<a href='/posts" + context.url + "'>" + title + "</a>"
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerPartials(__dirname + '/templates/layouts');






app.get('/', function(req, res){
	if(req.session.user){
		var user = req.session.user;
		if (user.role == 'Commander')
            res.redirect('/commander');
        else
            res.redirect('/assetOfficer');
	}
	res.render('index');
});
//login post form
app.post('/',LoginController.check_login);

//logout
app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});


var cmo_route = require('./views/cmo_route');
app.use('/', cmo_route);

//dummy CMO API
app.get('/dummyCmo/:caseId',function(req,res){
    //demo fail
    if (req.params.caseId == 0)
      return res.json({})
    res.json({
              "location": {
                  "name": "Bukit",
                  "latitude": 12.1,
                  "longitude": 80.33
              },
              "incidentType": [
                  "Earthquake"
              ],
              "updateLog": [],
              "caseId": req.params.caseId,
              "affectedArea": "",
              "injuryCount": "1-50",
              "casualtyCount": "20-50",
              "incidentDateTime": "2018-04-10T06:26:21.073Z",
              "description": "Big and serious incident",
              "status": "Open"
          });
});



//all route below req authentication
app.use('/',requiredAuthentication);
//app.get('/userList', requiredAuthentication, LoginController.list_all_users);

var my_view = require('./views/view');
app.use('/', my_view);

var api_route = require('./views/api_route');
app.use('/', api_route);







app.use(function(err, req, res, next) {
  res.status(500).send(err.stack.toString());
});

app.listen(8888, () => console.log('Example app listening on port 8888!'))

//all functions here
function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/');
    }
}