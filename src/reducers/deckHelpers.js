export const buildDeck = () => {
    //Build the deck
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    const suits = ["S", "C", "D", "H"]

    let deck = []
    let counter = 0;

    for (let j in suits) {
        for (let k in values) {
            deck[counter] = `${suits[j]}${values[k]}`;
            ++counter;
        }
    }

    return deck;
};

export const cloneDeck = (deck, numClones) => {
    // Create copies of the deck
    let decks = []

    for (let i = 0; i < numClones; i++) {
        decks = [...decks, ...deck]
    }
    return decks
}

export const shuffle = (cards) => {
    let tmp = 0
    let index = 0
    let shuffledCards = [...cards]
    let numCards = shuffledCards.length

    // While there are cards to shuffle…
    while (numCards) {
        // Pick a remaining element…
        index = Math.floor(Math.random() * numCards--);
        // And swap it with the current element.
        tmp = shuffledCards[numCards];
        shuffledCards[numCards] = shuffledCards[index];
        shuffledCards[index] = tmp;
    }
    return [...shuffledCards];
};