export default {
  dealer: {
    name: "Dealer",
    avatar: "./images/dealer.png",
    hand: ["HA", "C5"],
    score: 0,
    busted: false,
    hasBlackjack: false
  },
  player: {
    name: "Player1",
    avatar: "./images/default.png",
    playerIndex: 1,

    balance: 0,
    currentBet: 0,

    hands: [["SA", "CK"], ["D2", "HJ"]],
    score: [0],
    busted: [false],
    hasBlackjack: [false],
    hasInsurance: [false],
    splitHand: false,
    playerStands: [false]
  },
  turn: {
    isPlaying: true,
    numPlayers: 2,
    playersTurn: 0,
    error: false,
    errMsg: ""
  },
  deck: {
    drawnCard: null,
    deck: []
  }
};
