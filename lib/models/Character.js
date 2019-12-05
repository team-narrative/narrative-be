const { Schema, model } = require('mongoose');

const schema = new Schema({
  characterName: {
    type: String,
    required: true
  },
  characterDescription: {
    type: String
  },
  characterTags: [{
    type: String
  }]
});

module.exports = model('Character', schema);