const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  locationStoryId: {
    type: Types.ObjectId,
    ref: 'Location',
    required: true
  },
  locationName: {
    type: String,
    required: true
  },
  locationDescription: {
    type: String
  },
  locationTags: [{
    type: String
  }]
});

module.exports = model('Location', schema);