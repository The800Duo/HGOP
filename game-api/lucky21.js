module.exports = (context) => {
  const deckConstructor = context('deck');
  const deck = deckConstructor(context);

  const dealerConstructor = context('dealer');
  const dealer = dealerConstructor(context);

  dealer.shuffle(deck);
  const card0 = dealer.draw(deck);
  const card1 = dealer.draw(deck);
  const state = {
    deck: deck,
    dealer: dealer,
    cards: [
      card0,
      card1,
    ],
    // The card that the player thinks will exceed 21.
    card: undefined,
  };
  return {
    state: state,
    // Is the game over (true or false).
    // Is the game finished.
    isGameOver: (game) => {
      if (game.state.card || game.getTotal(game) >= 21) {
        return true;
      }
      return false;
    },
    // Has the player won (true or false).
    playerWon: (game) => {
      if (game.state.card && game.getTotal(game) > 21) {
        return true;
      } else if (!game.state.card && game.getTotal(game) === 21) {
        return true;
      } else {
        return false;
      }
    },
    // The highest score the cards can yield without going over 21 (integer).
    getCardsValue: (game) => {
      let value = 0;
      game.state.cards.sort(forSorting);
      for (let i = 0; i < game.state.cards.length; i++) {
        const c = game.state.cards[i].slice(0, -1);
        if (royal(c)) {
          value += 10;
        } else if (ace(c)) {
          value += 11;
          if (value > 21) {
            value -= 10;
          }
        } else {
          value += Number(c);
        }
      }
      return value;
    },
    // The value of the card that should exceed 21 if it exists (integer or undefined).
    getCardValue: (game) => {
      if (game.state.card) {
        const currCard = game.state.card.slice(0, -1);
        let cardValue = Number(currCard);
        if (royal(currCard)) {
          cardValue = 10;
        }
        if (ace(currCard)) {
          if (game.getCardsValue(game) > 10) {
            cardValue = 1;
          } else {
            cardValue = 11;
          }
        }
        return cardValue;
      }
      return game.state.card;
    },
    // The cards value + the card value if it exits (integer).
    getTotal: (game) => {
      return (game.state.card) ? game.getCardValue(game) + game.getCardsValue(game) : game.getCardsValue(game);
    },
    // The player's cards (array of strings).
    getCards: (game) => {
      return game.state.cards;
    },
    // The player's card (string or undefined).
    getCard: (game) => {
      return game.state.card;
    },
    // Player action (void).
    guess21OrUnder: (game) => {
      const newCard = dealer.draw(deck);
      game.state.cards.push(newCard);
    },
    // Player action (void).
    guessOver21: (game) => {
      game.state.card = dealer.draw(game.state.deck);
    },
    getState: (game) => {
      return {
        cards: game.getCards(game),
        card: game.getCard(game),
        gameOver: game.isGameOver(game),
        total: game.getTotal(game),
        cardValue: game.getCardValue(game),
        cardsValue: game.getCardsValue(game),
        playerWon: game.playerWon(game),
      };
    },
  };
};

function royal(card) {
  if (Number(card) > 10) {
    return true;
  }
  return false;
}

function ace(card) {
  if (Number(card) === 1) {
    return true;
  }
  return false;
}
function forSorting(a, b) {
  return a < b;
}
