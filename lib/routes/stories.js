const { Router } = require('express');
const Story = require('../models/Story');
const { ensureAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { storyTitle, storySynopsis, storyGenre, storyTags } = req.body;
    Story
      .create({
        userId: req.user.sub,
        storyTitle,
        storySynopsis,
        storyGenre,
        storyTags
      })
      .then(story => res.send(story))
      .catch(next);
  });
