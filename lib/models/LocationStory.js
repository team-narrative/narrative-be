const { Schema, model } = require('mongoose');

const schema = new Schema({
  location: {
    type: schema.Type.ObjectId,
    ref: 'Location'
  },
  story: {
    type: schema.Type.ObjectId,
    ref: 'Story'
  }
});

module.exports = model('LocationStory', schema);