const { Schema, model } = require('mongoose');

const schema = new Schema({
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