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
    game.state.cards = [ '10C', '05H', '02D' ]
    expect(game.getCards(game)).toEqual([ '10C', '05H', '02D' ]);
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
    deck = [ '13H' , '04D'];
    game = lucky21Constructor(deck, dealer);
    expect(game.getCardsValue(game)).toEqual(14);
});

test('that a sum of all numbers is correct', () => {
    deck = [ '03H' , '04D', '05C', '02S', '05H'];
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(19);
});

test('that a Ace is of value 11 when totalValue is <= 21', () => {
    deck = [ '01C', '02S', '05H' ];
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(18);
});

test('that a Ace is of value 1 when total would be over 21', () => {
    deck = [ '01C', '12S', '04H' ];
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(15);
});

test('that a edge case of all aces returns 14', () => {
    deck = [ '01C', '01S', '01H', '01D' ];
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(14);
})

test('Test that game is not over', () => {
    expect(game.isGameOver(game)).toEqual(false);
});

test('that guessOver draws next card and sets as player card', () => {
    deck = [ '07C', '03S', '01H', '04D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCard(game)).toEqual('03S');
});

test('should return 10 when value exceeds 21', () => {
    deck = [ '02C', '11S', '07H', '09D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCardValue(game)).toEqual(10);
});

test('should return 11 when value exceeds 21 and card is ace', () => {
    deck = [ '02C', '01S', '07H', '09D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.getCardValue(game)).toEqual(11);
});

test('should return undifined when value doesnt exceed 21', () => {
    deck = [ '02C', '02S', '07H', '09D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.getCardValue(game)).toEqual(undefined);
});

test('that a total value is correct when next card is undefined', () => {
    deck = [ '10C', '02H', '07H', '09H' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.getTotal(game)).toEqual(18);
});

test('that a total value is correct when next card is 10C', () => {
    deck = [ '10C', '02H', '07H', '09H' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    game.guessOver21(game);
    expect(game.getTotal(game)).toEqual(28);
});

test('that a player wins if he starts with 21', () => {
    deck = [ '01H', '13H' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    expect(game.playerWon(game)).toEqual(true);
});

test('that a player wins if he hits 21 when guessunder', () => {
    deck = [ '04H', '12H', '07S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.playerWon(game)).toEqual(true);
});

test('that a player wins if he guesses over when total exceeds 21', () => {
    deck = [ '04H', '12H', '08S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(true);
});

test('that a player loses when he guesses over and total hits 21', () => {
    deck = [ '04H', '12H', '07S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(false);
});

test('that a player loses when he guesses over and total does not exceeds 21', () => {
    deck = [ '04H', '12H', '04S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(false);
});

test('that a player guesses under and total exceeds 21', () => {
    deck = [ '04H', '12H', '13S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.playerWon(game)).toEqual(false);
});

test('that game is over when player guesses over', () => {
    deck = [ '04H', '02C', '03S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guessOver21(game);
    expect(game.isGameOver(game)).toEqual(true);
});

test('that game is over when player guesses under and total exceeds 21', () => {
    deck = [ '10H', '11C', '12S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.isGameOver(game)).toEqual(true);
});

test('that game is over when player hits 21 in 2 cards', () => {
    deck = [ '01C', '12S' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    expect(game.isGameOver(game)).toEqual(true);
});

test('that game is not over when player guesses under and total is under 21', () => {
    deck = [ '04S', '05D', '07H' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    expect(game.isGameOver(game)).toEqual(false);
});

/*test('that player loses when guess over and hits ace', () => {
    deck = [ '01C', '06H', '03C', '08D' ];
    dealer.shuffle = (deck) => {};
    game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(false);
});*/