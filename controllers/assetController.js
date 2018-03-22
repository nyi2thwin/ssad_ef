var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/case/', function(req, res){
  var template_data = {title : 'EF | Home'}
  res.render('case', template_data);
});

module.exports = router;