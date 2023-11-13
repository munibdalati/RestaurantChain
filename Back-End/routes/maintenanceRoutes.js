const express = require('express');
const maintenanceController = require('../controllers/maintenanceController');
const router = express.Router();

// ----------------- add application route -----------------
router.post('/addForm3',maintenanceController.createForm3);




module.exports = router;
