var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/cases/', function(req, res){
	/*
	Case ID (Int)
Locations (ArrrayList)
->Location Name (String)
->Location Latitude (Double)
->Location Longitude (Double)
Affected Area (Int, unit square meters)
No. of Injury (Int)
No. of Casualty (Int)
Incident Date Time (Datetime)
Type of Incident (Enum)
Description (String)
	*/
  	var data = {
  				"caseId":1,
  				"locations":[],
  				"affectedArea":32,
  				"noInjure":3,
  				"noCasualty":3,
  				"incidentDateTime":"2017-03-01"
  				};
  	res.send('case', template_data);
});

module.exports = router;