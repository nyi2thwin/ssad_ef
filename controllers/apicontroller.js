var mongoose = require('mongoose');
    IncidentReport = mongoose.model('IncidentReport');
    fetch = require('fetch').fetchUrl;

exports.fetch_from_CMO = function(req,res){
    //Depends on the case_id sent by CMO, then fetch the data
    var cmo_url = 'http://localhost:8888/dummyCmo/';
    fetch(cmo_url+req.params.caseId, function(error, meta, body){
      var data = JSON.parse(body);
      if(error){
        //console.log(error);
        return res.json({"status":"error","message":"internal error"});
      }
        
      //get the data;
      if(data.hasOwnProperty('caseId')){
        var incidentReport = new IncidentReport(data);
        incidentReport.save(function(err){
          if(err){
            //console.log(error);
            return res.json({"status":"error","message":"save error"});
          }
          return res.json({"status":"ok"});
        });
      }else{
          return res.json({"status":"error","message":"not found"});
      }
      
    });
}

