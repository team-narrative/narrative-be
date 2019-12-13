require('dotenv').config();
jest.mock('../../lib/middleware/ensure-auth.js');
const mongoose = require('mongoose');
const request = require('../request.js');
const connect = require('../../lib/utils/connect');

describe('Character API', () => {
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

  function postCharacter(posting, id) {
    return request
      .post(`/api/v1/characters/${id}`)
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  const character = {
    characterName: 'writing a test',
    characterDescription: 'this must be a synopsis test'
  };

  const character2 = {
    characterName: 'two two',
    characterDescription: 'uuhhh testing this'
  };

  const character3 = {
    characterName: 'testy three',
    characterDescription: 'test test test'
  };

  it('posts a character', async() => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/characters/${storyId}`)
          .send(character)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'characterDescription': 'this must be a synopsis test', 'characterName': 'writing a test', 'characterStoryId': storyId, 'characterTags': [], 'userId': '7890' });
          });
      });
  });

  it('gets a character', () => {
    let storyId;
    let characterId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/characters/${storyId}`)
          .send(character)
          .expect(200)
          .then(({ body }) => {
            characterId = body._id;
            return request
              .put(`/api/v1/characters/${characterId}`)
              .send({
                characterName: 'updating name', characterDescription: 'description' })
              .expect(200)
              .then(({ body }) => {
                expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'characterDescription': 'description', 'characterName': 'updating name', 'characterStoryId': storyId, 'characterTags': [], 'userId': '7890' });
              });
          });
      });
  });

  it('gets all characters', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() =>  {
        return Promise.all([
          postCharacter(character, storyId),
          postCharacter(character2, storyId),
          postCharacter(character3, storyId)
        ])
          .then(() => {
            return request
              .get('/api/v1/characters')
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.length).toBe(3);
            expect(body[0]).toEqual({ '__v': 0, '_id': expect.any(String), 'characterDescription': 'this must be a synopsis test', 'characterName': 'writing a test', 'characterStoryId': storyId, 'characterTags': [], 'userId': '7890' });
          });
      });
  });

  it('can edit a character', () => {
    let storyId;
    let characterId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/characters/${storyId}`)
          .send(character)
          .expect(200)
          .then(({ body }) => {
            characterId = body._id;
            return request
              .put(`/api/v1/characters/${characterId}`)
              .send({
                characterName: 'updating name', characterDescription: 'description' })
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.characterName).toBe('updating name');
          });
      });
  });

  it('can delete a character', () => {
    let storyId;
    let characterId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/characters/${storyId}`)
          .send(character)
          .expect(200)
          .then(({ body }) => {
            characterId = body._id;
            return request
              .delete(`/api/v1/stories/${characterId}`)
              .expect(200);
          });
      });
  });
});