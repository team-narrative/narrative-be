const Location = require('../Location');
const { Types } = require('mongoose');

describe('Location model', () => {

  it('validates correct location model', () => {
    const validLocationModel = {
      userId: 'testuserid',
      locationStoryId: new Types.ObjectId,
      locationName: 'Alaska, USA',
      locationDescription: 'Barren, yet beautiful!',
      locationTags: ['test']
    };  

    const location = new Location(validLocationModel);
    const errors = location.validateSync();
    expect(errors).toBeUndefined();

    const json = location.toJSON();

    expect(json).toEqual({
      ...validLocationModel,
      _id: expect.any(Object)
    });
  });

  it('validates required properties in model', () => {
    const testData = {};
    const story = new Location(testData);
    const { errors } = story.validateSync();
    expect(errors.userId.kind).toBe('required');
    expect(errors.locationStoryId.kind).toBe('required');
    expect(errors.locationName.kind).toBe('required');
  });
});