module.exports = (context) => {
  const random = context('random').randomInt;
  return {
    shuffle: (deck) => {
      for (let i = 0; i < deck.length - 1; i++) {
        const j = random(i, deck.length);
        const card = deck[j];
        const old = deck[i];
        deck[i] = card;
        deck[j] = old;
      }
    },
    draw: (deck) => {
      const card = deck.pop();
      return card;
    },
  };
};
