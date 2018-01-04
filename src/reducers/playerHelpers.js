export default function getScore(state) {
  // Define scoring enum
  const points = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: 11
  };

  // Declare a function to return the score
  const scoreHand = cards => {
    // Set initial values
    let score = 0;
    let numberOfAces = 0;

    // Calculate score based on points enum
    score = cards
      .map(card => {
        if (card.slice(1) === "A") numberOfAces++;
        return points[card.slice(1)];
      })
      .reduce((a, b) => a + b);

    // Score aces as 1 if they bring the score over 21
    while (numberOfAces && score > 21) {
      score -= 10;
      --numberOfAces;
    }

    return score;
  };

  // Score the current hand
  const index = state.handIndex;
  const newScore = scoreHand(state.hands[index]);

  // Return a new object with the updated score
  return {
    score: replaceAtIndex(state.score, newScore, index),
    busted: replaceAtIndex(state.busted, newScore > 21, index),
    hasBlackjack: replaceAtIndex(
      state.hasBlackjack,
      newScore === 21 && state.hands[index].length === 2,
      index
    )
  };
}

export function replaceAtIndex(parentArray, itemToAdd, index) {
  return [
    ...parentArray.slice(0, index),
    itemToAdd,
    ...parentArray.slice(index + 1)
  ];
}

export function addCard(hands, card, index = 0) {
  const newHand = [...hands[index], card];

  return {
    hands: replaceAtIndex(hands, newHand, index)
  };
}
