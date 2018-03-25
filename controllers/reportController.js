'use strict';
var mongoose = require('mongoose'),
	IncidentReport = mongoose.model('IncidentReport'),
	LiveReport = mongoose.model('LiveReport');


exports.list_all_LiveReport = function(req, res) {
  LiveReport.find({}, function(err, LiveReport) {
    if (err)
      res.send(err);
    res.json(LiveReport);
  });
};


