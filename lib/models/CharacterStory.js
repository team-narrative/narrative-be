const { Schema, model } = require('mongoose');

const schema = new Schema({
  character: {
    type: schema.Type.ObjectId,
    ref: 'Character'
  },
  story: {
    type: schema.Type.ObjectId,
    ref: 'Story'
  }
});

module.exports = model('CharacterStory', schema);