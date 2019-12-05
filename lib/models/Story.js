const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'User',
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
  }],
  storyCharacters: {
    type: schema.Types.ObjectId,
    ref: 'Characters'
  },
  storyLocations: {
    type: schema.Types.ObjectId,
    ref: 'Locations'
  },
  storyChapters: {
    type: schema.Types.ObjectId,
    ref: 'Chapters'
  },
  storyWorld: {
    type: schema.Types.ObjectId,
    ref: 'World'
  }
});

module.exports = model('Story', schema);