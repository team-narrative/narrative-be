require('dotenv').config();
jest.mock('../../lib/middleware/ensure-auth.js');
const mongoose = require('mongoose');
const request = require('../request.js');
const connect = require('../../lib/utils/connect');

describe('Chapter API', () => {
  beforeAll(() => connect());
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => mongoose.connection.close());

  const story = {
    storyTitle: 'writing a test',
    storyText: 'this must be a synopsis test'
  };

  function postStory(posting) {
    return request
      .post('/api/v1/stories')
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  function postChapter(posting, id) {
    return request
      .post(`/api/v1/chapters/${id}`)
      .send(posting)
      .expect(200)
      .then(({ body }) => body);
  }

  const chapter = {
    chapterName: 'writing a test',
    chapterText: 'this must be a synopsis test'
  };

  const chapter2 = {
    chapterName: 'two two',
    chapterText: 'uuhhh testing this'
  };

  const chapter3 = {
    chapterName: 'testy three',
    chapterText: 'test test test'
  };

  it('posts a chapter', async() => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/chapters/${storyId}`)
          .send(chapter)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'chapterName': 'writing a test', 'chapterStoryId': storyId, 'chapterTags': [], 'chapterText': 'this must be a synopsis test', 'userId': '7890' });
          });
      });
  });

  it('gets a chapter', () => {
    let storyId;
    let chapterId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/chapters/${storyId}`)
          .send(chapter)
          .expect(200)
          .then(({ body }) => {
            chapterId = body._id;
            return request
              .put(`/api/v1/chapters/${chapterId}`)
              .send({
                chapterName: 'updating name', chapterDescription: 'description' })
              .expect(200)
              .then(({ body }) => {
                expect(body).toEqual({ '__v': 0, '_id': expect.any(String), 'chapterName': 'updating name', 'chapterStoryId': storyId, 'chapterTags': [], 'chapterText': 'this must be a synopsis test', 'userId': '7890' });
              });
          });
      });
  });

  it('gets all chapters', () => {
    let storyId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() =>  {
        return Promise.all([
          postChapter(chapter, storyId),
          postChapter(chapter2, storyId),
          postChapter(chapter3, storyId)
        ])
          .then(() => {
            return request
              .get('/api/v1/chapters')
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.length).toBe(3);
            expect(body[0]).toEqual({ '__v': 0, '_id': expect.any(String), 'chapterName': 'writing a test', 'chapterStoryId': storyId, 'chapterTags': [], 'chapterText': 'this must be a synopsis test', 'userId': '7890' });
          });
      });
  });

  it('can edit a chapter', () => {
    let storyId;
    let chapterId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/chapters/${storyId}`)
          .send(chapter)
          .expect(200)
          .then(({ body }) => {
            chapterId = body._id;
            return request
              .put(`/api/v1/chapters/${chapterId}`)
              .send({
                chapterName: 'updating name', chapterDescription: 'description' })
              .expect(200);
          })
          .then(({ body }) => {
            expect(body.chapterName).toBe('updating name');
          });
      });
  });

  it('can delete a chapter', () => {
    let storyId;
    let chapterId;
    return postStory(story)
      .then(story => {
        storyId = story._id;
      })
      .then(() => {
        return request
          .post(`/api/v1/chapters/${storyId}`)
          .send(chapter)
          .expect(200)
          .then(({ body }) => {
            chapterId = body._id;
            return request
              .delete(`/api/v1/stories/${chapterId}`)
              .expect(200);
          });
      });
  });
});