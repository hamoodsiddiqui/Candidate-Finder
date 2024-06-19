const bcrypt = require("bcryptjs");
const { users } = require("../models");

exports.registerUser = async (req, res) => {
  const { username, email, passwords } = req.body;
  console.log(req.body);
  try {
    // Create a new user in the database
    const newUser = await users.create({ username, passwords, email });

    // Respond with a success message and user details
    res.status(201).json({
      message:
        "User registered successfully. Please check your email for confirmation.",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};
exports.signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email in the database
    const user = await users.findOne({ where: { email } });

    // If no user found, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user has verified their email
    if (!user.verified) {
      return res
        .status(400)
        .json({ message: "Please verify your email before signing in" });
    }

    // If all checks pass, user signed in successfully
    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign in failed" });
  }
};
