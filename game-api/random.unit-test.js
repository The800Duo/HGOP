let randomConstructor = require('./random.js');

describe('Testing the random functionality', () => {
    let newRandom;
    let randomInt;
    beforeEach(() => {
	    newRandom = randomConstructor();
		randomInt = newRandom.randomInt;
    });
	test('Random returns a number between min and max', () => {
		let min = 0;
		let max = 10;
		expect(randomInt(min, max)).toBeLessThanOrEqual(max);
		expect(randomInt(min, max)).toBeGreaterThanOrEqual(min);
    });
    test('Random returns exactly 999', () => {
		let min = 999;
		let max = 999;
		expect(randomInt(min, max)).toEqual(min);
		expect(randomInt(min, max)).toEqual(max);
    });
    test('Random returns a number between min and max', () => {
        let min = 0;
        let max = 0;
        expect(randomInt(min, max)).toEqual(min);
        expect(randomInt(min, max)).toEqual(max);
    });
});