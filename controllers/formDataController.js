const { formdata } = require("../models");
const path = require("path");
const fs = require("fs");

exports.uploadFile = (req, res) => {
  const userId = sessionid; // Adjust how you retrieve userId based on your session handling

  console.log("File information:", JSON.stringify(req.file, null, 2));
  if (!req.file) {
    return res.status(400).json({ message: "No file selected!" });
  }

  const newFilePath = req.file.filename; // Assuming Multer stores the filename in req.file.filename

  formdata
    .findOne({ where: { userId } })
    .then((existingRecord) => {
      if (existingRecord) {
        // Delete the old file if it exists
        const oldFilePath = path.join(
          __dirname,
          "../public/uploads",
          existingRecord.filePath
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting old file:", err);
            }
          });
        }

        // Update the record with the new file path
        return existingRecord.update({ filePath: newFilePath });
      } else {
        // Create a new record
        return formdata.create({ userId, filePath: newFilePath });
      }
    })
    .then((updatedRecord) => {
      res
        .status(200)
        .json({ message: "File uploaded successfully", filePath: newFilePath });
    })
    .catch((err) => {
      console.error("Error saving to database:", err);
      res.status(500).json({ message: "Server error" });
    });
};
