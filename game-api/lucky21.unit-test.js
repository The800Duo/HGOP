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
    expect(game.getCard(game)).toEqual(undefined);
});

test('that a player gets a card with value 03H', () => {
    deck = [ '03H', '02S', '10H' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.state.card = dealer.draw(game.state.deck);
    expect(game.getCard(game)).toEqual('03H');
});

test('that a royal card returns 10', () => {
    deck = [ '13H' , '4D'];
    game = lucky21Constructor(deck, dealer);
    expect(game.getCardsValue(game)).toEqual(14);
});

test('that a sum of all numbers is correct', () => {
    deck = [ '3H' , '4D', '5C', '2S', '5H'];
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(19);
});

test('that a Ace is of value 11 when totalValue is <= 21', () => {
  deck = [ '1C', '2S', '5H' ];
  game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toEqual(18);
});

test('that a Ace is of value 1 when total would be over 21', () => {
  deck = [ '1C', '12S', '4H' ];
  game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toEqual(15);
});

test('that a edge case of all aces returns 14', () => {
  deck = [ '1C', '1S', '1H', '1D' ];
  game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toEqual(14);
})

test('Test that game is not over', () => {
    expect(game.isGameOver(game)).toEqual(false);
});

test('that guessOver draws next card and sets as player card', () => {
    deck = [ '7C', '3S', '1H', '4D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCard(game)).toEqual('3S');
});

test('should return 10 when value exceeds 21', () => {
    deck = [ '2C', '11S', '7H', '9D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCardValue(game)).toEqual(10);
});

test('should return 11 when value exceeds 21 and card is ace', () => {
    deck = [ '2C', '1S', '7H', '9D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCardValue(game)).toEqual(11);
});

test('should return undifined when value doesnt exceed 21', () => {
    edeck = [ '2C', '2S', '7H', '9D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCardValue(game)).toEqual(undefined);
});