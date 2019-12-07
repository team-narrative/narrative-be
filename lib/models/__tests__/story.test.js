const Story = require('../story');

describe('Story model', () => {

  it('validates correct story model', () => {
    const validStoryModel = {
      userId: 'testuserid',
      storyTitle: 'test story title',
      storySynopsis: 'test story synopsis',
      storyGenre: ['test'],
      storyTags: ['test1']
    };

    const story = new Story(validStoryModel);
    const errors = story.validateSync();
    expect(errors).toBeUndefined();

    const json = story.toJSON();

    expect(json).toEqual({
      ...validStoryModel,
      _id: expect.any(Object)
    });
  });

  it('validates required properties in model', () => {
    const testData = {};
    const story = new Story(testData);
    const { errors } = story.validateSync();
    expect(errors.userId.kind).toBe('required');
    expect(errors.storyTitle.kind).toBe('required');
  });
});