/* eslint-disable no-irregular-whitespace */

const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');
const randomConstructor = require('./random.js');

currentDependencies = () => {
  return {
    'deck': deckConstructor,
    'dealer': dealerConstructor,
    'random': randomConstructor(),
  };
};

const noShuffleConstructor = () => {
  return {
    'shuffle': () => { }, // TODO SHUFFLE
    'draw': (deck) => {
      return deck.pop();
    },
  };
};

let dependencies = currentDependencies();

const context = (name) => {
  return dependencies[name];
};

describe('Initialize game tests', () => {
  let game;
  beforeEach(() => {
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('a new game should have 50 cards left in the deck', () => {
    expect(game.state.deck.length).toEqual(50);
  });

  test('a new game should have 2 drawn cards', () => {
    expect(game.state.cards.length).toEqual(2);
  });
});

describe('Card is drawn', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '05C', '01D', '09S', '10H',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });
  test('guess21OrUnder should draw the next card', () => {
    // Act
    game.guess21OrUnder(game);
    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
  });
});

describe('Get correct value of current hand', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '05C', '02D', '05H', '10H',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('that a player card is a 10H', () => {
    game.state.cards = ['10H'];
    expect(game.getCards(game)).toEqual(['10H']);
  });

  test('that players hand is 10H, 5H, 2D', () => {
    game.state.cards = ['10H', '05H', '02D'];
    expect(game.getCards(game)).toEqual(['10H', '05H', '02D']);
  });
});

describe('get correct value of next card', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '07C', '03S', '01H', '04D',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('that a player gets a card with undefined value', () => {
    expect(game.getCard(game)).toEqual(undefined);
  });

  test('that a player gets a card with value 07C', () => {
    game.guess21OrUnder(game);
    game.state.card = game.state.dealer.draw(game.state.deck);
    expect(game.getCard(game)).toEqual('07C');
  });

  test('that guessOver draws next card and sets as player card', () => {
    game.guessOver21(game);
    expect(game.getCard(game)).toEqual('03S');
  });
});

describe('Returns the correct value of cards', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '02S', '05H', '01H', '01S', '01D', '01C', '13H', '04D',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('that a royal card returns 10', () => {
    expect(game.getCardsValue(game)).toEqual(14);
  });

  test('that a sum of all numbers is correct', () => {
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(17);
  });

  test('that a Ace is of value 11 when totalValue is <= 21', () => {
    game.state.cards = ['02S', '05H'];
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(18);
  });

  test('that a Ace is of value 1 when total would be over 21', () => {
    game.guess21OrUnder(game);
    expect(game.getCardsValue(game)).toEqual(15);
  });

  test('that a edge case of all aces returns 14', () => {
    game.state.cards = ['01C', '01S', '01H', '01D'];
    expect(game.getCardsValue(game)).toEqual(14);
  });
});

describe('Test game over function', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '04H', '02C', '03S', '10H', '11C', '12S', '01C', '04C', '02H', '01D',
        ],
        'dealer': dealerConstructor,
        'random': randomConstructor(),
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('that game is over when player guesses over', () => {
    game.state.cards = ['04H', '02C', '03S'];
    game.guessOver21(game);
    expect(game.isGameOver(game)).toEqual(true);
  });

  test('that game is over when player guesses under and total exceeds 21', () => {
    game.state.cards = ['11C', '12S'];
    game.state.card = '10H';
    game.guess21OrUnder(game);
    expect(game.isGameOver(game)).toEqual(true);
  });

  test('that game is over when player hits 21 in 2 cards', () => {
    game.state.cards = ['01C', '12S'];
    expect(game.isGameOver(game)).toEqual(true);
  });

  test('Test that game is not over', () => {
    game.state.cards = ['04C', '03S', '02H', '01D'];
    expect(game.isGameOver(game)).toEqual(false);
  });

  test('that game is not over when player guesses under and total is under 21', () => {
    game.state.cards = ['04C', '02H'];
    game.guess21OrUnder(game);
    expect(game.isGameOver(game)).toEqual(false);
  });
});

describe('get correct value of next card', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '01S', '11S', '02S', '07H', '09D',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('should return 10 when value exceeds 21', () => {
    game.state.cards = ['07H', '09D'];
    game.state.card = '11S';
    expect(game.getCardValue(game)).toEqual(10);
  });

  test('should return 1 when guess over and card is ace', () => {
    game.state.cards = ['07H', '09D'];
    game.state.card = '01S';
    expect(game.getCardValue(game)).toEqual(1);
  });

  test('should return undifined when value doesnt exceed 21', () => {
    game.state.cards = ['07H', '09D'];
    game.guess21OrUnder(game);
    expect(game.getCardValue(game)).toEqual(undefined);
  });
});

describe('Get the correct total value of cards', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '10C', '02H', '07H', '09H',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('that a total value is correct when next card is undefined', () => {
    game.guess21OrUnder(game);
    expect(game.getTotal(game)).toEqual(18);
  });

  test('that a total value is correct when next card is 10C', () => {
    game.guess21OrUnder(game);
    game.guessOver21(game);
    expect(game.getTotal(game)).toEqual(28);
  });
});

describe('Player wins or loses', () => {
  let game;
  beforeEach(() => {
    currentDependencies = () => {
      return {
        'deck': () => [
          '01C', '06H', '03C', '08D', '13S', '04S', '08S', '13H', '01H', '04H', '12H', '07S',
        ],
        'dealer': noShuffleConstructor,
      };
    };
    dependencies = currentDependencies();
    game = lucky21Constructor(context);
  });

  test('that a player wins if he starts with 21', () => {
    game.state.cards = ['01H', '13H'];
    expect(game.playerWon(game)).toEqual(true);
  });

  test('that a player wins if he hits 21 when guessunder', () => {
    game.guess21OrUnder(game);
    expect(game.playerWon(game)).toEqual(true);
  });

  test('that a player wins if he guesses over when total exceeds 21', () => {
    game.state.cards = ['12H', '08S'];
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(true);
  });

  test('that a player loses when he guesses over and total hits 21', () => {
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(false);
  });

  test('that a player loses when he guesses over and total does not exceeds 21', () => {
    game.state.cards = ['12H', '04S'];
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(false);
  });

  test('that a player guesses under and total exceeds 21', () => {
    game.state.cards = ['12H', '13S'];
    game.guess21OrUnder(game);
    expect(game.playerWon(game)).toEqual(false);
  });

  test('that player loses when guess over and hits ace', () => {
    game.state.cards = ['03C', '08D'];
    game.guess21OrUnder(game);
    game.guessOver21(game);
    expect(game.playerWon(game)).toEqual(false);
  });
});

