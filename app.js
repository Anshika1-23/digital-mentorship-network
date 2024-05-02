const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mentorRoutes = require('./routes/mentorRoutes');
const menteeRoutes = require('./routes/menteeRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const config = require('./config/config');
const path = require('path');
const auth = require('./middleware/auth');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/digital_mentorship', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/mentees', menteeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);

app.use('/mentors', auth, mentorRoutes);
app.use('/mentees', auth, menteeRoutes);

// Route for serving the register.html file
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Route for serving the login.html file
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/mentors', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mentors.html'));
});

app.get('/home', (req, res) => {
  res.sendFile = path.join(__dirname, 'public', 'index.html');

});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
