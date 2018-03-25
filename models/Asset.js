'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssetScheme = new Schema({
	type: {
		type:String,  //firefighter , police , FBI whatever etc
		required: 'Kindly enter asset type'
	},
	availableUnit: {
		type:Number, //Officer? commander etc
		required: 'Kindly enter available number'
	},
	totalUnit: {
		type:Number,
		required: 'Kindly enter total number'
	}
});

module.exports = mongoose.model('Asset', AssetScheme);