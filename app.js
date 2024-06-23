// const express = require("express");
// const session = require("express-session");
// const path = require("path");
// const bodyParser = require("body-parser");
// const { sequelize } = require("./models");
// const upload = require("./config/multerconfig"); // Import multer configuration
// module.exports = upload;

// const userRoutes = require("./routes/userRoutes");
// const formDataRoutes = require("./routes/formDataRoutes");

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // app.use(express.static(path.join(__dirname, "public")));

// // Set up the view engine to serve HTML files
// app.set("views", path.join(__dirname, "public", "views"));
// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");

// // Session middleware
// app.use(
//   session({
//     secret: "suxen", // Change this to a long random string in production
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set secure:true in production with HTTPS
//   })
// );

// // Routes
// app.use("/users", userRoutes);
// app.use("/formdata", formDataRoutes);
// // Serve the index.html file for '/'
// app.get("/", (req, res) => {
//   res.render("index.html");
// });

// // File upload route
// // app.post("/upload", upload, (req, res) => {
// //   res.send("Files uploaded successfully");
// // });

// // Start server
// sequelize
//   .sync({ force: false }) // Set 'force' to true if you want to drop tables on every restart
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   })
//   .catch((err) => console.error("Error syncing database:", err));

console.log("Starting server setup...");
const express = require("express");
const session = require("express-session");
const path = require("path");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
console.log("Loaded userRoutes...");
const formDataRoutes = require("./routes/formDataRoutes");
console.log("Loaded formDataRoutes...");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;
const formDataController = require("./controllers/formDataController");
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "public", "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(
  session({
    secret: "suxen",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads/"),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB file size limit
});

app.use("/users", userRoutes);
app.use("/formdata", formDataRoutes);
app.post(
  "/formdata/upload",
  upload.single("filePath"),
  formDataController.uploadFile
);
app.get("/", (req, res) => {
  res.render("index.html");
});

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Error syncing database:", err));
