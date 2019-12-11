const router = require('express').Router();
const Chapter = require('../models/chapter');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/:storyId', ensureAuth, ({ params, user, body }, res, next) => {
    const { chapterName, chapterText, chapterTags } = body;
    Chapter.create({
      chapterStoryId: params.storyId,
      userId: user.id,
      chapterName,
      chapterText,
      chapterTags
    })
      .then(chapter => res.send(chapter))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Chapter.find()
      .lean()
      .then(chapters => res.json(chapters))
      .catch(next);
  })
  .get('/:storyId', ensureAuth, ({ params }, res, next) => {
    Chapter.find({ chapterStoryId: params.storyId })
      .lean()
      .then(chaptersByStory => {
        res.json(chaptersByStory);
      })
      .catch(next);
  })
  .put('/:chapterId', ensureAuth, ({ params, body }, res, next) => {
    Chapter.findByIdAndUpdate(
      params.chapterId,
      body,
      { new: true }
    )
      .then(updatedChapter => {
        res.json(updatedChapter);
      })
      .catch(next);
  })
  .delete('/:chapterId', ensureAuth, ({ params }, res, next) => {
    Chapter.findByIdAndRemove(params.chapterId)
      .then(deletedCharacter => res.json(deletedCharacter))
      .catch(next);
  });

module.exports = router;