var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EFDatabase');
require('../models/IncidentReport');
var IncidentReport = mongoose.model('IncidentReport');

//Commander Home Page
router.get('/commander/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
	var template_data = {title : 'Commander Home Page'};
	//Current Display : Case ID, location, status.
	IncidentReport.find({ caseId: { $gt: 0 }},{_id:0,caseId:1,location:1,status:1},function(err,result){
		res.render('commander_home',{template_data,result});
	 })
});

//Cloase case by ID.
router.get('/close_case/:id', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
	var template_data = {title : 'Case Closed'};
	//IncidentReport.update.
	var update_id=req.params.id;
	IncidentReport.update({caseId : update_id},{$set:{status:'closed'}},function (err, raw) {
	  });
	res.redirect('/commander');
});

//Assign Asset Page
router.get('/assign_assets/:id', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
	var template_data = {title : 'EF Assign Asset'}
	IncidentReport.find({ caseId: { $gt: 0 }},{_id:0,caseId:1},function(err,result){
		res.render('assign_assets', {template_data,result});
	 })

});

router.get('/create_new_incident/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
	var template_data = {title : 'Create New Incident'};
	res.render('create_new_incident',template_data);

});


router.get('/assetOfficer/', function(req, res){
	if (req.session.user.role != 'AssetsOfficer')
		res.redirect('/');
 	var template_data = {title : 'EF Submit Live Report'}
 	res.render('submit_live_report', template_data);
});


module.exports = router;