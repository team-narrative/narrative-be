const World = require('../World');
const { Types } = require('mongoose');

describe('World model', () => {

  it('validates correct world model', () => {
    const validWorldModel = {
      userId: 'testuserid',
      worldStoryId: new Types.ObjectId,
      worldName: 'Nature',
      worldDescription: 'Open and free',
      worldTags: ['test']
    };  

    const world = new World(validWorldModel);
    const errors = world.validateSync();
    expect(errors).toBeUndefined();

    const json = world.toJSON();

    expect(json).toEqual({
      ...validWorldModel,
      _id: expect.any(Object)
    });
  });

  it('validates required properties in model', () => {
    const testData = {};
    const story = new World(testData);
    const { errors } = story.validateSync();
    expect(errors.userId.kind).toBe('required');
    expect(errors.worldStoryId.kind).toBe('required');
    expect(errors.worldName.kind).toBe('required');
  });
});