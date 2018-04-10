var express = require('express');
var router = express.Router();


var reportController = require('../controllers/reportController');
var assetController = require('../controllers/assetController');

router.get('/commander/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
 	reportController.get_all_IncidentReport().then(function(result){
 		res.render('commander_home', {IncidentReports:result});
 	});	
});

router.get('/commander/assign_assets/:caseId', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
	
	//res.render('assign_assets', {IncidentReports:result});
	assetController.get_all_asset().then(function(assets){
 		res.render('assign_assets', {caseId:req.params.caseId,assets:assets});
 	});	
});

router.get('/create_new_incident/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
 	res.render('create_new_incident');
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

router.post('/updateAsset',function(req,res){
	var caseId=req.body.caseId;
	var types=(req.body.team_type.toString()).split(',');
	var numbers=(req.body.numberofpeople.toString()).split(',');
	var dataset = [];
	var assets = [] ;
	var updatednumbers =[];
	for (i=0;i<types.length;i++){
		dataset[i]={type:types[i],
      number:numbers[i]
		}
	}
	console.log(caseId);
	for (i=0;i<dataset.length;i++){
		//var index = i;
		assetController.deduct_asset(dataset[i].type,dataset[i].number);
		reportController.insert_assets(caseId,dataset[i].type,dataset[i].number);
	}
	res.redirect('/commander');
});



module.exports = router;