const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentorModel');
const auth = require('../middleware/auth');


// Get all mentors
router.get('/', auth, async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new mentor
router.post('/mentors', async (req, res) => {
  const { name, expertise, email } = req.body; // Extract mentor information from request body

  // Create a new mentor instance
  const mentor = new Mentor({
    name,
    expertise,
    email
  });

  try {
    const newMentor = await mentor.save();
    res.status(201).json(newMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
