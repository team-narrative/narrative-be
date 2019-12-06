const router = require('express').Router();
const Story = require('../models/Story');
const CharacterStory = require('../models/CharacterStory');
const WorldStory = require('../models/WorldStory');
const LocationStory = require('../models/LocationStory');
const Chapter = require('../models/Chapter');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/', ensureAuth, (req, res, next) => {
    const { storyTitle, storySynopsis, storyGenre, storyTags } = req.body;
    Story.create({
      userId: req.user.sub,
      storyTitle,
      storySynopsis,
      storyGenre,
      storyTags
    })
      .then(story => res.send(story))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Story.find()
      .lean()
      .then(story => res.json(story))
      .catch(next);
  })
  .get('/:id', ensureAuth, ({ params }, res, next) => {
    return Promise.all([
      Story.findById(params.id)
        .lean(),
      CharacterStory.find({ storyId: params.id })
        .populate('characterId')
        .lean(),
      WorldStory.find({ storyId: params.id })
        .populate('worldId')
        .lean(),
      LocationStory.find({ storyId: params.id })
        .populate('locationId')
        .lean(),
      Chapter.find({ chapterStory: params.id })
        .lean()
    ])
      .then(([story, characterStory, worldStory, locationStory, chapter]) => {
        story.characterStory = characterStory;
        story.worldStory = worldStory;
        story.locationStory = locationStory;
        story.chapter = chapter;
        res.json(story);
      })
      .catch(next);
  });

module.exports = router;
