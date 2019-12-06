const router = require('express').Router();
const Location = require('../models/Location');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/:storyId', ensureAuth, (req, res, next) => {
    const { locationName, locationDescription, locationTags } = req.body;
    Location.create({
      locationStoryId: req.params.storyId,
      userId: req.user.sub,
      locationName,
      locationDescription,
      locationTags
    })
      .then(location => res.send(location))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Location.find()
      .lean()
      .then(locations => res.json(locations))
      .catch(next);
  })
  .get('/:storyId', ensureAuth, ({ params }, res, next) => {
    Location.find({ locationStoryId: params.storyId })
      .lean()
      .then(locationsByStory => {
        res.json(locationsByStory);
      })
      .catch(next);
  })
  .put('/:locationId', ensureAuth, ({ params, body }, res, next) => {
    Location.findByIdAndUpdate(
      params.locationId,
      body,
      { new: true }
    )
      .then(updatedLocation => res.json(updatedLocation))
      .catch(next);
  });

module.exports = router;

