var express = require('express');
var router = express.Router();

var reportController = require('../controllers/reportController');

router.get('/liveData/:caseId',reportController.getIncidentById);


module.exports = router;

