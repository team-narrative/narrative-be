const router = require('express').Router();
const World = require('../models/World');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/:storyId', ensureAuth, (req, res, next) => {
    const { worldName, worldDescription, worldTags } = req.body;
    World.create({
      worldStoryId: req.params.storyId,
      userId: req.user.sub,
      worldName,
      worldDescription,
      worldTags
    })
      .then(world => res.send(world))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    World.find()
      .lean()
      .then(worlds => res.json(worlds))
      .catch(next);
  })
  .get('/:storyId', ensureAuth, ({ params }, res, next) => {
    World.find({ worldStoryId: params.storyId })
      .lean()
      .then(worldsByStory => res.json(worldsByStory))
      .catch(next);
  })
  .put('/:worldId', ensureAuth, ({ params, body }, res, next) => {
    World.findByIdAndUpdate(
      params.worldId,
      body,
      { new: true }
    )
      .then(updatedWorld => res.json(updatedWorld))
      .catch(next);
  })
  .delete('/:worldId', ensureAuth, (req, res, next) => {
    World.findByIdAndDelete(req.params.worldId)
      .then(deletedWorld => res.json(deletedWorld))
      .catch(next);
  });

module.exports = router;