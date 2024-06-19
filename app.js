const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models"); // Import Sequelize instance
const userRoutes = require("./routes/userRoutes");
const formDataRoutes = require("./routes/formDataRoutes");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set up the view engine to serve HTML files (optional for API-only apps)
app.set("views", path.join(__dirname, "public", "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Start server
sequelize
  .sync({ force: false, alter: true }) // Change 'force' to true if you want to drop tables on every restart
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Error syncing database:", err));

// Routes
app.use("/users", userRoutes); // Example: /users/register, /users/login
app.use("/formdata", formDataRoutes); // Example: /formdata/create, /formdata/list

// Serve the index.html file for '/'
app.get("/", (req, res) => {
  res.render("index.html");
});
