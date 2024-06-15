const { Users } = require('../models/users');

exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const newUser = await users.create({ username, password, email });
    res.status(201).json({ message: 'User registered successfully',Users: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};
