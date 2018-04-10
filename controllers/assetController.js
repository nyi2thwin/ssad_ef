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

exports.get_all_asset = function() {
  //console.log('here');
  return Asset.find({}) // Notice the return here
  .exec()
  .then((Assets) => {
    return Assets;
  })
  .catch((err) => {
    console.log(err);
    return [];
  });
};

exports.deduct_asset = function(type,number) {
  var minus_number = parseInt(number)*(-1);
  Asset.findOneAndUpdate({assetType:type},{$inc:{'availableUnit':minus_number}}).exec()
  .then((Asset) => {
    return Asset;
  })
  .catch((err) => {
    console.log(err);
    return {};
  });
};




