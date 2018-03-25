'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncidentReportScheme = new Schema({
	caseId: {
		type:String,  //firefighter , police , FBI whatever etc
		required: 'Kindly enter caseId'
	},
	location: [],
	affectedArea: {
		type:Number,
		required: 'Kindly enter total affectedArea'
	},
	noOfInjury:{
		type:Number,
		required: 'Kindly enter total noOfInjury'
	},
	noOfCasualty:{
		type:Number,
		required: 'Kindly enter total noOfCasualty'
	},
	incidentDateTime:{ 
		type: Date, 
		default: Date.now 
	},
	typeOfIncident{
		type: String,
		required: 'Kindly enter typeOfIncident'
	},
	description{
		type: String,
		required: 'Kindly enter description'
	}
});

module.exports = mongoose.model('IncidentReport', IncidentReportScheme);

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