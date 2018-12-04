const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

let deck = deckConstructor();
let dealer = dealerConstructor();
let game = lucky21Constructor(deck, dealer);

test('a new game should have 50 cards left in the deck', () => {

  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {

  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  deck = [
      '05C', '01D', '09S', '10H', 
  ];
  dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('Test that a player card is a 10C', () => {
    game.state.cards = [ '10C' ];
    expect(game.getCards(game)).toEqual([ "10C" ]);
});

test('Test that players hand is 10C, 5H, 2D', () => {
    game.state.cards = [ '10C', '5H', '2D' ]
    expect(game.getCards(game)).toEqual([ '10C', '5H', '2D' ]);
});

test('Test that game is not over', () => {
    expect(game.isGameOver(game)).toEqual(false);
});


