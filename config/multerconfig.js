// // const multer = require("multer");
// // const path = require("path");

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "../public/uploads/"),
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 }, // 5MB file size limit
// });

// module.exports = upload;
