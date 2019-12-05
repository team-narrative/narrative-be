const { Schema, model } = require('mongoose');

const schema = new Schema({
  chapterStory: {
    type: schema.Type.ObjectId,
    ref: 'Story'
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