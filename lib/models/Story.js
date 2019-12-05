const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: {
    type: String,
    required: true
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