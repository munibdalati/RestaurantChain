const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// ----------------- add application route -----------------
router.post('/addForm2',menuController.createForm2);




module.exports = router;
