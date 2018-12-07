const newDealer = require('./dealer.js');

function newRandom(randomReturnValues) {
  let i = 0;
  return {
    randomInt: (min, max) => {
      return randomReturnValues[i++];
    },
  };
}

describe('Check if shuffle function works properly', () => {
  let dealer1;
  let dealer2;
  let dependenciesForDealer1;
  let dependenciesForDealer2;
  beforeEach(() => {
    dependenciesForDealer1 = {
      'random': newRandom([2, 1]),
    };
    dependenciesForDealer2 = {
      'random': newRandom([1, 2, 3]),
    };
    dealer1 = newDealer((name) => {
      return dependenciesForDealer1[name];
    });
    dealer2 = newDealer((name) => {
      return dependenciesForDealer2[name];
    });
  });
  test('dealer should should shuffle cards', () => {
    // Arrange
    const deck = ['a', 'b', 'c'];

    // Act
    dealer1.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
  });

  test('dealer should should shuffle cards after shuffle', () => {
    // Arrange
    const deckForDealer1 = ['a', 'b', 'c'];
    const deckForDealer2 = ['a', 'b', 'c'];
    dealer1.shuffle(deckForDealer1);
    dealer2.shuffle(deckForDealer2);

    // Assert
    expect(deckForDealer1).not.toEqual(deckForDealer2);
  });

  test('that a deck is of correct length', () => {
    // Arrange
    const deck = ['a', 'b', 'c', 'd'];

    // Act
    dealer2.shuffle(deck);

    // Assert
    expect(deck.length).toEqual(4);
  });
});

describe('Check if draw function works properly', () => {
  let dealer;
  let dependencies;
  beforeEach(() => {
    dependencies = {
      'random': newRandom([2, 1]),
    };
    dealer = newDealer((name) => {
      return dependencies[name];
    });
  });
  test('that a deck is of correct length after draw', () => {
    // Arrange
    const deck = ['a', 'b', 'c'];

    // Act
    dealer.draw(deck);
    dealer.draw(deck);

    // Assert
    expect(deck.length).toEqual(1);
  });
  test('that the correct card is drawn', () => {
    // Arrange
    const deck = ['a', 'b', 'c'];

    // Act & Assert
    expect(dealer.draw(deck)).toEqual('c');
  });
  test('that a card from empty deck is undifined', () =>{
    // Arrange
    const deck = [];

    // Act & Assert
    expect(dealer.draw(deck)).toEqual(undefined);
  });
});
