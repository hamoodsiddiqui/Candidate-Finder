const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/register
router.post('/register', function(req,res){userController.registerUser});

module.exports = router;
