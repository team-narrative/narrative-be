const router = require('express').Router();
const Character = require('../models/Character');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/:storyId', ensureAuth, (req, res, next) => {
    const { characterName, characterDescription, characterTags } = req.body;
    Character.create({
      characterStoryId: req.params.storyId,
      userId: req.user.sub,
      characterName,
      characterDescription,
      characterTags
    })
      .then(character => res.send(character))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Character.find()
      .lean()
      .then(characters => res.json(characters))
      .catch(next);
  })
  .get('/:storyId', ensureAuth, ({ params }, res, next) => {
    Character.find({ characterStoryId: params.storyId })
      .lean()
      .then(charactersByStory => {
        res.json(charactersByStory);
      })
      .catch(next);
  })
  .put('/characterId', ensureAuth, ({ params, body }, res, next) => {
    Character.findByIdAndUpdate(
      params.characterId,
      body,
      { new: true }
    )
      .then(updatedCharacter => {
        res.json(updatedCharacter);
      })
      .catch(next);
  });

module.exports = router;