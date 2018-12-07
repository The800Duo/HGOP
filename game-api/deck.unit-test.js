const deckConstructor = require('./deck.js');

describe('Testing if deck is correct', () => {
  test('that a deck has 52 cards', () => {
    const deck = deckConstructor();
    expect(deck.length).toEqual(52);
  });
});
