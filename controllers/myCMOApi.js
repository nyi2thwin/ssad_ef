var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/new_case/', function(req, res){
  var template_data = {title : 'EF | Home'}
  res.render('compile_incident_report', template_data);
});

module.exports = router;