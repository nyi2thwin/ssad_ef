var express = require('express');
var router = express.Router();


router.get('/assign_assets/', function(req, res){
  var template_data = {title : 'EF Assign Asset'}
  res.render('assign_assets', template_data);
});

router.get('/submit_live_report/', function(req, res){
  var template_data = {title : 'EF Submit Live Report'}
  res.render('submit_live_report', template_data);
});

router.get('/compile_incident_report/', function(req, res){
  var template_data = {title : 'Compile '}
  res.render('compile_incident_report', template_data);
});


router.get('/new_case/', function(req, res){
  var template_data = {title : 'Compile '}
  res.render('new_case', template_data);
});



module.exports = router;