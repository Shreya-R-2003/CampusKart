const express = require('express');
const router = express.Router();
const Login = require('../models/Login');

router.use(express.json());

// Login route
router.post('/', async (req, res) => {
  // Request body contains username and password
  const { username, password } = req.body;

  console.log('Received request:', { username, password });
  try {
    const user = await Login.findOne({ username: username });

    if (user) {
      if (password === user.password) {
        res.status(200).json({ username: username, message: 'Login Successful!', success: true });

        
      } else if (password !== user.password) {
        res.status(401).json({ message: "Password didn't match", success: false });
      }
    } else {
      res.status(404).json({ message: 'User not registered', success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

// GET all logins route
router.get('/', async (req, res) => {
  try {
    const logins = await Login.find();
    res.status(200).json(logins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;