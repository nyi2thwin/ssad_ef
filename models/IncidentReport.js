'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncidentReportScheme = new Schema({
	caseId: {type: Number, index: {unique: true}},
	location:  {
	    name: String,
	    latitude:  Number,
	    longitude: Number
	},
	incidentType:[String],
	affectedArea:Number,
	injuryCount:String,
	casualtyCount:String,
	incidentDateTime:Date,
	description:String,
	status:String,
	updateLog: [{
		description:String,
		updatedTime:Date
	}],
	assignedAssets:[{
		assetType: String,
        assignedCount: Number,
        dateTime:Date
   	}]
});

module.exports = mongoose.model('IncidentReport', IncidentReportScheme);

