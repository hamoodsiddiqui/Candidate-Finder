const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// POST /users/register
router.post("/register", userController.registerUser);

// POST /users/signin
router.post("/signin", userController.signInUser);

module.exports = router;
