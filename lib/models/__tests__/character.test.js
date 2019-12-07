const Character = require('../character');
const { Types } = require('mongoose');

describe('Character model', () => {

  it('validates correct character model', () => {
    const validCharacterModel = {
      userId: 'testuserid',
      characterStoryId: new Types.ObjectId,
      characterName: 'Chris McCandless, Alexander Supertramp',
      characterDescription: 'Happiness real only when shared',
      characterTags: ['test']
    };  

    const character = new Character(validCharacterModel);
    const errors = character.validateSync();
    expect(errors).toBeUndefined();

    const json = character.toJSON();

    expect(json).toEqual({
      ...validCharacterModel,
      _id: expect.any(Object)
    });
  });

  it('validates required properties in model', () => {
    const testData = {};
    const story = new Character(testData);
    const { errors } = story.validateSync();
    expect(errors.userId.kind).toBe('required');
    expect(errors.characterStoryId.kind).toBe('required');
    expect(errors.characterName.kind).toBe('required');
  });
});