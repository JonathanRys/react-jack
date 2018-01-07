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

    balance: 500,
    currentBet: 5,

    hands: [["SA", "CK"], ["D2", "HJ"]],
    status: [null],
    score: [0],
    busted: [false],
    hasBlackjack: [false],
    hasInsurance: [false],
    splitHand: false,
    playerStands: [false]
  },
  turn: {
    isPlaying: false,
    numPlayers: 2,
    playersTurn: 1,
    error: false,
    errMsg: ""
  },
  deck: {
    drawnCard: null,
    deck: []
  },
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn()
};
