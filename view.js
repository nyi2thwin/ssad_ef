var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/EFDatabase');

Asset = mongoose.model('Asset');
IncidentReport = mongoose.model('IncidentReport');

router.get('/commander/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
 	var template_data = {title : 'EF Assign Asset'};
	IncidentReport.find({},function(err,incidentReports){
		Asset.find({},function(err,assets){
			res.render('assign_assets', {
				incidentReports:incidentReports,
				assets:assets
			});
		});
	});
});

router.get('/assetOfficer/', function(req, res){
	if (req.session.user.role != 'AssetsOfficer')
		res.redirect('/');
 	var template_data = {title : 'EF Submit Live Report'}
 	res.render('submit_live_report', template_data);
});

router.post('/updateAsset',function(req,res){
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
	console.log(dataset);
	for (i=0;i<dataset.length;i++){
		let value = dataset[i].number;
		console.log(value);
		//var index = i;
			Asset.findOne({type: dataset[i].type},function(err,asset){
				let value2 = value;
				Asset.update({type:asset.type},{availableUnit:asset.availableUnit - parseInt(value2)},function(err){
					if(err){
					console.log(err);
					return;
					}else{
					res.render('new_case');
					}
				});
		});
	}
	//	Asset.findOne({type: query[j].type},function(err,asset){
			//	for(n=0;n<numbers.length;n++){
				//	var availableUnit = asset.availableUnit - numbers[n];
				//	Asset.update({type:asset.type},{availableUnit:availableUnit},function(err){
					//	if(err){
					//		console.log(err);
					//		return;
				//		}else{
					//		res.redirect('/');
					//	}
				//	});
			//	}
		//	});

});


module.exports = router;
