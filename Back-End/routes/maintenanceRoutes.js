const express = require('express');
const maintenanceController = require('../controllers/maintenanceController');
const router = express.Router();

// ----------------- get all applications route -----------------
router.get('/allApplications', maintenanceController.getAllApplication);
// ----------------- add application route -----------------
router.post('/addForm3',maintenanceController.createForm3);




module.exports = router;
