const express = require('express');
const router = express.Router();
const formDataController = require('../controllers/formDataController');

// POST /api/formdata/submit
router.post('/submit', function(req,res){formDataController.submitFormData});

module.exports = router;
