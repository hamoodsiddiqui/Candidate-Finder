const express = require("express");
const router = express.Router();
const formDataController = require("../controllers/formDataController");
// const upload = require("../config/multerconfig");
// POST /formdata/submit

// router.post(
//   "/upload",
//   upload.single("filePath"),
//   formDataController.uploadFile
// );
// router.post("/upload", upload.single("filePath"), (req, res) => {
//   formDataController.uploadFile(req, res, upload);
// });
router.get("/upload", (req, res) => {
  res.render(`formfill.html`);
});

module.exports = router;
