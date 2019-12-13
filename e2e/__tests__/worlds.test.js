require('dotenv').config();
jest.mock('../../lib/middleware/ensure-auth.js');
const mongoose = require('mongoose');
const request = require('../request.js');
const connect = require('../../lib/utils/connect');

describe('World API', () => {
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

  function postWorld(posting, id) {
    return request
      .post(`/api/v1/worlds/${id}`)
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  const world = {
    worldName: 'writing a test',
    worldDescription: 'this must be a synopsis test'
  };

  const world2 = {
    worldName: 'two two',
    worldDescription: 'uuhhh testing this'
  };

  const world3 = {
    worldName: 'testy three',
    worldDescription: 'test test test'
  };

  it('posts a world', async() => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/worlds/${storyId}`)
          .send(world)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'worldDescription': 'this must be a synopsis test', 'worldName': 'writing a test', 'worldStoryId': storyId, 'worldTags': [], 'userId': '7890' });
          });
      });
  });

  it('gets a world', () => {
    let storyId;
    let worldId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/worlds/${storyId}`)
          .send(world)
          .expect(200)
          .then(({ body }) => {
            worldId = body._id;
            return request
              .put(`/api/v1/worlds/${worldId}`)
              .send({
                worldName: 'updating name', worldDescription: 'description' })
              .expect(200)
              .then(({ body }) => {
                expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'worldDescription': 'description', 'worldName': 'updating name', 'worldStoryId': storyId, 'worldTags': [], 'userId': '7890' });
              });
          });
      });
  });

  it('gets all worlds', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() =>  {
        return Promise.all([
          postWorld(world, storyId),
          postWorld(world2, storyId),
          postWorld(world3, storyId)
        ])
          .then(() => {
            return request
              .get('/api/v1/worlds')
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.length).toBe(3);
            expect(body).toContainEqual(expect.objectContaining(world));
            expect(body).toContainEqual(expect.objectContaining(world2));
            expect(body).toContainEqual(expect.objectContaining(world3));
          });
      });
  });

  it('can edit a world', () => {
    let storyId;
    let worldId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/worlds/${storyId}`)
          .send(world)
          .expect(200)
          .then(({ body }) => {
            worldId = body._id;
            return request
              .put(`/api/v1/worlds/${worldId}`)
              .send({
                worldName: 'updating name', worldDescription: 'description' })
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.worldName).toBe('updating name');
          });
      });
  });

  it('can delete a world', () => {
    let storyId;
    let worldId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/worlds/${storyId}`)
          .send(world)
          .expect(200)
          .then(({ body }) => {
            worldId = body._id;
            return request
              .delete(`/api/v1/stories/${worldId}`)
              .expect(200);
          });
      });
  });
});