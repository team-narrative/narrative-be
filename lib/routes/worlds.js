const router = require('express').Router();
const World = require('../models/world');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/:storyId', ensureAuth, ({ body, params, user }, res, next) => {
    const { worldName, worldDescription, worldTags } = body;
    World.create({
      worldStoryId: params.storyId,
      userId: user.id,
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
  .delete('/:worldId', ensureAuth, ({ params }, res, next) => {
    World.findByIdAndDelete(params.worldId)
      .then(deletedWorld => res.json(deletedWorld))
      .catch(next);
  });

module.exports = router;