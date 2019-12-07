const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  chapterStoryId: {
    type: Types.ObjectId,
    ref: 'Story',
    required: true
  },
  chapterName: {
    type: String,
    required: true
  },
  chapterText: {
    type: String
  },
  chapterTags: [{
    type: String
  }]
});

module.exports = model('Chapter', schema);