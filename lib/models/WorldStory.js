const { Schema, model } = require('mongoose');

const schema = new Schema({
  world: {
    type: schema.Type.ObjectId,
    ref: 'World'
  },
  story: {
    type: schema.Type.ObjectId,
    ref: 'Story'
  }
});

module.exports = model('WorldStory', schema);