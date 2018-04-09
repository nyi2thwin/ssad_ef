var mongoose = require('mongoose');
    Incident = mongoose.model('IncidentReport');
    fetch = require('fetch').fetchUrl;

export.fetch_from_CMO = function(req,res){
    //Depends on the case_id sent by CMO, then fetch the data
    fetch("CMO URL"+req.params.caseId, function(error, meta, body){
      var data = JSON.parse(body);
      //get the data;
      var incidentReport = new IncidentReport(data);
      //incidentReport.caseId = json.caseId;
      //incidentReport.loaction = json.loacation;
      //incidentReport.affectedArea = json.affectedArea;
      //incidentReport.casualtyCount = json.causaltyType;
      //incidentReport.incidentDateTime = json.incidentDateTime;
      //incidentReport.description = json.description;
      //incidentReport.status = json.status;
      incidentReport.save(function(err){
        if(err){
          console.log(err);
          return;
        }
        res.redirect('/views/commandHome');
      });
    });
}

//export.provide_date_CMO = function(req,res){
  //Incident.findById(req.parms.id,function(err,incident){
    //if(err){
      //res.send(err);
    //}
    //res.json(task);
  //});
//}
