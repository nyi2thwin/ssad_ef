var mongoose = require('mongoose');
    IncidentReport = mongoose.model('IncidentReport');
    fetch = require('fetch').fetchUrl;

exports.fetch_from_CMO = function(req,res){
    //Depends on the case_id sent by CMO, then fetch the data
    var cmo_url = 'http://10.27.26.126:3000/crisis/';
    //
    var cmo_url = 'http://localhost:8888/dummyCmo/';
    fetch(cmo_url+req.params.caseId, {timeout:5000},function(error, meta, body){
        try {
            var data = JSON.parse(body);
        } catch(e) {
            var data = {};
        }
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

