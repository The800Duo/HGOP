const randomConstructor = require('./random.js');

describe('Testing the random functionality', () => {
  let newRandom;
  let randomInt;
  beforeEach(() => {
    /* eslint-disable-next-line */
	  newRandom = randomConstructor();
    randomInt = newRandom.randomInt;
  });

  test('Random returns a number between min and max', () => {
    const min = 0;
    const max = 10;
    expect(randomInt(min, max)).toBeLessThanOrEqual(max);
    expect(randomInt(min, max)).toBeGreaterThanOrEqual(min);
  });

  test('Random returns exactly 999', () => {
    const min = 999;
    const max = 999;
    expect(randomInt(min, max)).toEqual(min);
    expect(randomInt(min, max)).toEqual(max);
  });

  test('Random returns a number between min and max', () => {
    const min = 0;
    const max = 0;
    expect(randomInt(min, max)).toEqual(min);
    expect(randomInt(min, max)).toEqual(max);
  });
});
