'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncidentReportScheme = new Schema({
	caseId: Number,
	location:  {
	    name: String,
	    latitude:  Number,
	    longitude: Number
	},
	incidentType:[String],
	affectedArea:Number,
	injuryCount:Number,
	casualtyCount:Number,
	incidentDateTime:Date,
	description:String,
	status:String,
	updateLog: [{
		description:String,
		updatedTime: Date
	}],
	assigned_assets:[{
		_assetId: Schema.Types.ObjectId,
		type: String,
		assigned_count: Number ,
	}]
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