const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String, 
    lowercase: true, 
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, default: Date.now
  },
  lastLoginAt: {
    type: Date, default: Date.now
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;