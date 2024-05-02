const express = require('express');
const router = express.Router();
const Mentee = require('../models/menteeModel');

// Get all mentees
router.get('/', async (req, res) => {
  try {
    const mentees = await Mentee.find();
    res.json(mentees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new mentee
router.post('/', async (req, res) => {
  const mentee = new Mentee({
    name: req.body.name,
    interest: req.body.interest,
    email: req.body.email
  });

  try {
    const newMentee = await mentee.save();
    res.status(201).json(newMentee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
