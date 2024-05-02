const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Mentee', menteeSchema);
