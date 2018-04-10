var express = require('express');
var router = express.Router();

var apicontroller = require('../controllers/apicontroller');
var reportController = require('../controllers/reportController');

router.get('/getdata/:caseId',apicontroller.fetch_from_CMO);
router.post('/insert_incident_report/',reportController.insert_incident_report);

router.get('/closeCase/:caseId',reportController.closeCase);
router.get('/openCase/:caseId',reportController.openCase);



module.exports = router;


