const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  worldStoryId: {
    type: Types.ObjectId,
    ref: 'World'
  },
  worldName: {
    type: String,
    required: true
  },
  worldDescription: {
    type: String
  },
  worldTags: [{
    type: String
  }]
});

module.exports = model('World', schema);