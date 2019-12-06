const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  characterStoryId: {
    type: Types.ObjectId,
    ref: 'Story'
  },
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