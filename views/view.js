var express = require('express');
var router = express.Router();


var reportController = require('../controllers/reportController');

router.get('/commander/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
 	var template_data = {title : 'EF Assign Asset'}
  	res.render('assign_assets', template_data);
});

router.get('/assetOfficer/', function(req, res){
	if (req.session.user.role != 'AssetsOfficer')
		res.redirect('/');
	reportController.get_all_IncidentReport().then(function(result){
 		res.render('submit_live_report', {IncidentReports:result});
 	});	
});

router.post('/assetOfficer/', function(req, res){
	if (req.session.user.role != 'AssetsOfficer')
		res.redirect('/');
 	reportController.insert_live_report(req, res).then(function(result){
 		reportController.get_all_IncidentReport().then(function(result){
	 		res.render('submit_live_report', {IncidentReports:result,success_message:"Successfully submitted!"});
	 	});	
 	}).catch((err) => {
 		console.log(err);
		reportController.get_all_IncidentReport().then(function(result){
	 		res.render('submit_live_report', {IncidentReports:result,error_message:"Something went wrong!!"});
	 	});	
 	});
 	
});



module.exports = router;