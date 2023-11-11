const express = require('express');
const basicInformationController = require('../controllers/basicInformationController');
const router = express.Router();

// ----------------- get all applications route -----------------
router.get('/allApplications', basicInformationController.getAllApplication);
// ----------------- add application route -----------------
router.post('/addForm1',basicInformationController.createForm1);




module.exports = router;
