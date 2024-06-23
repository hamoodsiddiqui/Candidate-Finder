// middleware/fileTypeChecker.js
const path = require("path");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf|docx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Files of type PDF and DOCX only!");
  }
}

module.exports = checkFileType;
