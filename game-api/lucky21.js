const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');

module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
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
            return game.getTotal > 21 
            
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            // TODO
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            let value = 0;
            game.state.cards.sort(function (a, b) {return a-b;});
            for(let i = 0; i < game.state.cards.length; i++){
                let c = game.state.cards[i].slice(0, -1);
                if(royal(c)){
                    value += 10;
                }else if(ace(c)){
                    value += 11;
                    if(value > 21) {
                        value -= 10;
                    }
                }else {
                value += Number(c);
                }
            }
            return value;
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            //TODO
        },
        // The cards value + the card value if it exits (integer).
        getTotal: (game) => {
            //TODO
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
            let newCard = dealer.draw(deck);
            game.state.cards.push(newCard);
        },
        // Player action (void).
        guessOver21: (game) => {
            game.state.card = dealer.draw(game.state.deck);
        },
    };
};

function royal(card) {
    if(Number(card > 10)) {
        return true;
    }
    return false;
}

function ace(card) {
    if(Number(card) === 1) {
        return true;
    }
    return false;
}