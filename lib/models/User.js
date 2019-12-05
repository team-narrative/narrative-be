const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userFirstName: {
    type: String,
    required: true
  },
  userLastName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  userImage: {
    type: String,
    default: '../assets/default-user-image.png'
  }
});

module.exports = model('User', schema);