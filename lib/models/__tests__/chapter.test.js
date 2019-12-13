const Chapter = require('../Chapter');
const { Types } = require('mongoose');

describe('Chapter model', () => {

  it('validates correct chapter model', () => {
    const validChapterModel = {
      userId: 'testuserid',
      chapterStoryId: new Types.ObjectId,
      chapterName: 'Chapter 1',
      chapterText: 'This is valid chapter text',
      chapterTags: ['test']
    };  

    const chapter = new Chapter(validChapterModel);
    const errors = chapter.validateSync();
    expect(errors).toBeUndefined();

    const json = chapter.toJSON();

    expect(json).toEqual({
      ...validChapterModel,
      _id: expect.any(Object)
    });
  });

  it('validates required properties in model', () => {
    const testData = {};
    const story = new Chapter(testData);
    const { errors } = story.validateSync();
    expect(errors.userId.kind).toBe('required');
    expect(errors.chapterStoryId.kind).toBe('required');
    expect(errors.chapterName.kind).toBe('required');
  });
});