const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  characterId: {
    type: Types.ObjectId,
    ref: 'Character'
  },
  storyId: {
    type: Types.ObjectId,
    ref: 'Story'
  }
});

module.exports = model('CharacterStory', schema);