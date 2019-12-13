require('dotenv').config();
jest.mock('../../lib/middleware/ensure-auth.js');
const mongoose = require('mongoose');
const request = require('../request.js');
const connect = require('../../lib/utils/connect');

describe('Location API', () => {
  beforeAll(() => connect());
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => mongoose.connection.close());

  const story = {
    storyTitle: 'writing a test',
    storySynopsis: 'this must be a synopsis test'
  };

  function postStory(posting) {
    return request
      .post('/api/v1/stories')
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  function postLocation(posting, id) {
    return request
      .post(`/api/v1/locations/${id}`)
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  const location = {
    locationName: 'writing a test',
    locationDescription: 'this must be a synopsis test'
  };

  const location2 = {
    locationName: 'two two',
    locationDescription: 'uuhhh testing this'
  };

  const location3 = {
    locationName: 'testy three',
    locationDescription: 'test test test'
  };

  it('posts a location', async() => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/locations/${storyId}`)
          .send(location)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'locationDescription': 'this must be a synopsis test', 'locationName': 'writing a test', 'locationStoryId': storyId, 'locationTags': [], 'userId': '7890' });
          });
      });
  });

  it('gets a location', () => {
    let storyId;
    let locationId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/locations/${storyId}`)
          .send(location)
          .expect(200)
          .then(({ body }) => {
            locationId = body._id;
            return request
              .put(`/api/v1/locations/${locationId}`)
              .send({
                locationName: 'updating name', locationDescription: 'description' })
              .expect(200)
              .then(({ body }) => {
                expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'locationDescription': 'description', 'locationName': 'updating name', 'locationStoryId': storyId, 'locationTags': [], 'userId': '7890' });
              });
          });
      });
  });

  it('gets all locations', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() =>  {
        return Promise.all([
          postLocation(location, storyId),
          postLocation(location2, storyId),
          postLocation(location3, storyId)
        ])
          .then(() => {
            return request
              .get('/api/v1/locations')
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.length).toBe(3);
            expect(body[0]).toEqual({ '__v': 0, '_id': expect.any(String), 'locationDescription': 'this must be a synopsis test', 'locationName': 'writing a test', 'locationStoryId': storyId, 'locationTags': [], 'userId': '7890' });
          });
      });
  });

  it('can edit a location', () => {
    let storyId;
    let locationId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/locations/${storyId}`)
          .send(location)
          .expect(200)
          .then(({ body }) => {
            locationId = body._id;
            return request
              .put(`/api/v1/locations/${locationId}`)
              .send({
                locationName: 'updating name', locationDescription: 'description' })
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.locationName).toBe('updating name');
          });
      });
  });

  it('can delete a location', () => {
    let storyId;
    let locationId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/locations/${storyId}`)
          .send(location)
          .expect(200)
          .then(({ body }) => {
            locationId = body._id;
            return request
              .delete(`/api/v1/stories/${locationId}`)
              .expect(200);
          });
      });
  });
});