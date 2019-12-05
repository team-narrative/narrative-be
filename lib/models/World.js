const { Schema, model } = require('mongoose');

const schema = new Schema({
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