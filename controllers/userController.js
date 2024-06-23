const bcrypt = require("bcryptjs");
const { users } = require("../models");
const { formdata } = require("../models");
const checkRole = require("../middleware/checkRole");
const { Op } = require("sequelize");
role = "candidate";
exports.registerUser = async (req, res) => {
  const { username, email, passwords } = req.body;
  console.log(req.body);
  try {
    // Create a new user in the database
    const newUser = await users.create({ username, passwords, email, role });

    // Respond with a success message and user details
    // res.status(201).json({
    //   message:
    //     "User registered successfully. Please check your email for confirmation.",
    //   user: newUser,
    // });
    console.log(`Registration successful......\n${newUser}`);
    res.redirect(`http://localhost:3000`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};
exports.signInUser = async (req, res) => {
  const { email, passwords } = req.body;

  try {
    // Find user by email in the database
    const user = await users.findOne({ where: { email } });

    // If no user found, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(passwords, user.passwords);

    // If passwords do not match, return error
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Store userId in session
    req.session.userId = user.id;
    req.session.role = user.role;
    sessionrole = req.session.role;
    sessionid = req.session.userId;
    console.log(`ID:${sessionid},\nROLE:${sessionrole}`);
    // Redirect or respond as needed
    if (sessionrole == "admin") {
      res.redirect("http://localhost:3000/users/admin/getUsers");
    } else {
      res.redirect("http://localhost:3000/users/submit-qualification");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign in failed" });
  }
};

exports.renderQualificationForm = (req, res) => {
  res.render("qualification.ejs");
};
exports.renderResumeForm = (req, res) => {
  res.render("formfill.html");
};
exports.submitQualificationForm = async (req, res) => {
  const { qualification, additionalQualification } = req.body;

  try {
    // Get the userId from session
    const userId = req.session.userId;

    // Find the user by userId
    const user = await users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's qualification and additionalQualification
    await user.update({ qualification, additionalQualification });

    res.redirect("http://localhost:3000/users/upload");
  } catch (error) {
    console.error("Error updating qualifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.applyFilter = async (req, res) => {
  const { qualification, additionalQualification } = req.body;

  try {
    // Build the where clause based on the filters
    let whereClause = {};

    if (qualification && qualification.length > 0) {
      whereClause.qualification = { [Op.in]: qualification };
    }

    if (additionalQualification && additionalQualification.length > 0) {
      whereClause.additionalQualification = {
        [Op.in]: additionalQualification,
      };
    }

    // Fetch the filtered form data
    const filteredFormData = await formdata.findAll({
      include: [
        {
          model: users,
          where: whereClause,
          attributes: ["username", "email"],
        },
      ],
    });

    // Render the admin view with filtered data
    res.render("filteredAdminView.ejs", { filteredFormData });
  } catch (error) {
    console.error("Error applying filter:", error);
    res.status(500).json({ message: "Server error" });
  }
};
