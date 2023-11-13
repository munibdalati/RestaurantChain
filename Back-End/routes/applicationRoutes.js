const express = require('express');
const applicationController = require('../controllers/applicationController');
const router = express.Router();

// ----------------- get all applications route -----------------
router.get('/getApplication', applicationController.getApplication);





module.exports = router;
