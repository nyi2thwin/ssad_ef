var express = require('express');
var router = express.Router();


router.get('/commander/', function(req, res){
	if (req.session.user.role != 'Commander')
		res.redirect('/');
 	var template_data = {title : 'EF Assign Asset'}
  	res.render('assign_assets', template_data);
});

router.get('/assetOfficer/', function(req, res){
	if (req.session.user.role != 'AssetsOfficer')
		res.redirect('/');
 	var template_data = {title : 'EF Submit Live Report'}
 	res.render('submit_live_report', template_data);
});


module.exports = router;