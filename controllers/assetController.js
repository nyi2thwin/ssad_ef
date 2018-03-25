'use strict';
var mongoose = require('mongoose'),
	Asset = mongoose.model('Asset');


exports.list_all_asset = function(req, res) {
  Asset.find({}, function(err, asset) {
    if (err)
      res.send(err);
    res.json(asset);
  });
};




