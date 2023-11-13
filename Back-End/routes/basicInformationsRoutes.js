const express = require('express');
const basicInformationController = require('../controllers/basicInformationController');
const router = express.Router();

// ----------------- add application route -----------------
router.post('/addForm1',basicInformationController.createForm1);




module.exports = router;
