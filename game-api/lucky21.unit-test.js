const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

let game;

beforeEach(() => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  game = lucky21Constructor(deck, dealer);
});

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

test('that a player card is a 10C', () => {
    game.state.cards = [ '10C' ];
    expect(game.getCards(game)).toEqual([ "10C" ]);
});

test('that players hand is 10C, 5H, 2D', () => {
    game.state.cards = [ '10C', '5H', '2D' ]
    expect(game.getCards(game)).toEqual([ '10C', '5H', '2D' ]);
});

test('that a player gets a card with undefined value', () => {
    console.log(game.state.deck.length);
    expect(game.getCard(game)).toEqual(undefined);
});

test('that a player gets a card with value 03H', () => {
    deck = [ '03H', '02S', '10H' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.state.card = dealer.draw(game.state.deck);
    expect(game.getCard(game)).toEqual('03H');
});

test('Test that game is not over', () => {
    expect(game.isGameOver(game)).toEqual(false);
});



