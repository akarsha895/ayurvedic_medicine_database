const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { findUserByEmail } = require('../models/user'); // Import function to find user from DB

// Login endpoint to generate JWT token
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Fetch user from the database (this is just an example)
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create a JWT token with the user data (typically you include user ID or some unique identifier)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
  
  res.json({ token });
});

module.exports = router;
