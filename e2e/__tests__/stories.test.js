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

 
});