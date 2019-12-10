const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
  },
  userImage: {
    type: String,
  },
  storyTitle: {
    type: String,
    required: true,
    unique: true
  },
  storySynopsis: {
    type: String
  },
  storyGenre: [{
    type: String
  }],
  storyTags: [{
    type: String
  }]
});

module.exports = model('Story', schema);