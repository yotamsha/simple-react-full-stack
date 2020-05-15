const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
	  type: Number,
	  default: 0
  }
  
});

let User = mongoose.model('User', UserSchema);

module.exports = User;