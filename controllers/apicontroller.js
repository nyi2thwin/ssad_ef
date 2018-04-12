var mongoose = require('mongoose');
    IncidentReport = mongoose.model('IncidentReport');
    fetch = require('fetch').fetchUrl;

exports.fetch_from_CMO = function(req,res){
    //Depends on the case_id sent by CMO, then fetch the data
    var cmo_url = 'http://localhost:8888/dummyCmo/';
    fetch(cmo_url+req.params.caseId, function(error, meta, body){
      var data = JSON.parse(body);
      if(data.hasOwnProperty('data') && data.data.hasOwnProperty('caseId')){
        var incidentReport = new IncidentReport(data.data);
        incidentReport.save(function(err){
          if(err)
            res.json({"status":"error","message":"save error"});
          
          res.json({"status":"ok"});
        });
      }else{
        res.json({"status":"error","message":"not found"});
      }
    });
}

