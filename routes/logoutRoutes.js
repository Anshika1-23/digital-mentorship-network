const express = require('express');
const router = express.Router();

// Logout user
router.get('/', (req, res) => {
  // Clear any session or token stored in the client
  // Example: You may need to clear cookies or remove JWT token from local storage
  res.json({ message: 'Logout successful' });
});

module.exports = router;