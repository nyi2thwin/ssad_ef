'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LiveReportScheme = new Schema({
	_caseId: Schema.Types.ObjectId,
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
	description{
		type: String,
		required: 'Kindly enter description'
	}
});

module.exports = mongoose.model('LiveReport', LiveReportScheme);

