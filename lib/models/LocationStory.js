const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  locationId: {
    type: Types.ObjectId,
    ref: 'Location'
  },
  storyId: {
    type: Types.ObjectId,
    ref: 'Story'
  }
});

module.exports = model('LocationStory', schema);