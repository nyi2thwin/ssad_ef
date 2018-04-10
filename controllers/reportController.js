'use strict';
var mongoose = require('mongoose'),
	IncidentReport = mongoose.model('IncidentReport');

exports.list_all_IncidentReport = function(req, res) {
  IncidentReport.find({}, function(err, IncidentReports) {
    if (err)
      res.send(err);
    res.json(IncidentReports);
  });
};

exports.get_all_IncidentReport = function() {
  //console.log('here');
  return IncidentReport.find({})
  .sort({_id:-1}) // Notice the return here
  .exec()
  .then((IncidentReports) => {
    return IncidentReports;
  })
  .catch((err) => {
    console.log(err);
    return [];
  });
};

exports.insert_incident_report = function(req, res) {
  	var new_incident = new IncidentReport(req.body);
  	new_incident.save(function(err,new_incident) {
  		if(err)
  			return res.send(err);
  		res.json(new_incident);
  	});
};


exports.editReview = function(req, res) {
	IncidentReport.findOneAndUpdate({_id: req.params.reviewId}, req.body, {new: true}, function(err, review) {
    	if (err)
			return res.send(err);
		res.json(review);
	});
};


exports.insert_live_report = function(req, res) {
  var update_data = {
                    affectedArea:req.body.affectedArea,
                    injuryCount:req.body.injuryCount,
                    casualtyCount:req.body.casualtyCount,
                    $addToSet:{updateLog:{updatedTime:Date.now(),description:req.body.description}}

  };
  return IncidentReport.findOneAndUpdate({caseId: req.body.caseId},update_data).exec().then((result)=>{
    return result;
  });
};

exports.insert_assets = function(caseId,type,number) {
  var update_data = {
                    $addToSet:{assignedAssets:{ assetType:type, assignedCount:number, dateTime:Date.now() } }
  };
  return IncidentReport.findOneAndUpdate({caseId:caseId},update_data).exec().then((result)=>{
    return result;
  });
};

exports.getIncidentById = function(req,res){
    IncidentReport.findOne({'caseId':req.params.caseId}, function(err, IncidentReport) {
        if (err)
            res.send(err);
        if(IncidentReport)
            res.json(IncidentReport);
        else
            res.json({});
    });
}

exports.closeCase = function(req, res) {
    IncidentReport.findOneAndUpdate({caseId: req.params.caseId},{"status":"Closed"}, function(err, IncidentReports) {
        if (err)
            console.log(err);
        res.redirect("/commander");
    });
};

exports.openCase = function(req, res) {
    IncidentReport.findOneAndUpdate({caseId: req.params.caseId},{"status":"Open"}, function(err, IncidentReports) {
        if (err)
            console.log(err);
        res.redirect("/commander");
    });
};


