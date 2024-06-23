const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const checkRole = require("../middleware/checkRole");

router.post("/register", userController.registerUser);
router.post("/signin", userController.signInUser);

router.post("/admin/send-email", checkRole("admin"), adminController.sendEmail);
router.get("/admin/getUsers", checkRole("admin"), adminController.getAdminView);
router.post("/admin/apply-filter", userController.applyFilter);

router.get("/upload", userController.renderResumeForm);
router.get("/submit-qualification", userController.renderQualificationForm);
router.post("/submit-qualification", userController.submitQualificationForm);
module.exports = router;
