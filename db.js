const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/mentorship_network'; // Replace with your MongoDB URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;