require('dotenv').config();
jest.mock('../../lib/middleware/ensure-auth.js');
const mongoose = require('mongoose');
const request = require('../request.js');
const connect = require('../../lib/utils/connect');

describe('Story API', () => {
  beforeAll(() => connect());
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => mongoose.connection.close());

  const story = {
    storyTitle: 'writing a test',
    storySynopsis: 'this must be a synopsis test'
  };

  const story2 = {
    storyTitle: 'two two',
    storySynopsis: 'uuhhh testing this'
  };

  const story3 = {
    storyTitle: 'testy three',
    storySynopsis: 'test test test'
  };

  async function postStory(posting) {
    return await request
      .post('/api/v1/stories')
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a story', async() => {
    const posted = await postStory(story);
    expect(posted).toEqual({ '__v': 0, '_id': expect.any(String), 'storyGenre': [], 'storySynopsis': 'this must be a synopsis test', 'storyTags': [], 'storyTitle': 'writing a test', 'userId': '7890', 'userImage': 'k.png', 'userName': 'p' });
  });

  it('gets a story', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .get(`/api/v1/stories/${storyId}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ '__v': 0, '_id': storyId, 'chapters': [], 'characters': [], 'locations': [], 'storyGenre': [], 'storySynopsis': 'this must be a synopsis test', 'storyTags': [], 'storyTitle': 'writing a test', 'userId': '7890', 'userImage': 'k.png', 'userName': 'p', 'worlds': [] });
          });
      });
  });

  it('gets all stories', () => {
    return Promise.all([
      postStory(story),
      postStory(story2),
      postStory(story3)
    ])
      .then(() => {
        return request
          .get('/api/v1/stories')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body).toContainEqual(expect.objectContaining(story));
        expect(body).toContainEqual(expect.objectContaining(story2));
        expect(body).toContainEqual(expect.objectContaining(story3));
      });
  });

  it('can edit a story', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
        return request
          .put(`/api/v1/stories/${storyId}`)
          .send({
            storyTitle: 'updating title', storyDescription: 'testing' })
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.storyTitle).toBe('updating title');
      });
  });

  it('can delete a story', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .delete(`/api/v1/stories/${storyId}`)
          .expect(200);
      });
  });
});