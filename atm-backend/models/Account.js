const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  otp: {
    type: String,
    required: false
  },
  accountType: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Account', accountSchema);