'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type:String, //Officer? commander etc
		required: 'Kindly enter username'
	},
	role: {
		type:String, //Officer? commander etc
		required: 'Kindly enter user role'
	},
	password: {
		type:String,
		required: 'Kindly enter password'
	}
});

module.exports = mongoose.model('User', UserSchema);