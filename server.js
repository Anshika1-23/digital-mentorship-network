// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/User');
const initializePassport = require('./auth'); 
const app = express();

// Passport config
initializePassport(passport);

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./routes/api'));


// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/mentorship_network';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
