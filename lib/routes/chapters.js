const router = require('express').Router();
const Chapter = require('../models/Chapter');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/:storyId', ensureAuth, (req, res, next) => {
    const { chapterName, chapterText, chapterTags } = req.body;
    Chapter.create({
      chapterStoryId: req.params.storyId,
      userId: req.user.sub,
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
  .delete('/:chapterId', ensureAuth, (req, res, next) => {
    Chapter.findByIdAndRemove(req.params.chapterId)
      .then(deletedCharacter => res.json(deletedCharacter))
      .catch(next);
  });

module.exports = router;