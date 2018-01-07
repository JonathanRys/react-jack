import gameEngine from "../gameEngine";

const mockProps = {
  dealer: {
    hand: [],
    score: 0
  },
  player: {
    hands: [[]],
    handIndex: 0,
    busted: [false],
    hasBlackjack: [false],
    playerStands: [false],
    score: [0]
  },
  turn: {
    isPlaying: false,
    playersTurn: 0
  },
  deck: {
    drawnCard: null
  },
  clearCard: jest.fn(),
  dealerTurn: jest.fn(),
  hitOnClick: jest.fn(),
  keepDealing: jest.fn(),
  giveDealerCard: jest.fn(),
  giveCard: jest.fn(),
  nextPlayer: jest.fn(),
  play: jest.fn(),
  stop: jest.fn(),
  winBet: jest.fn()
};

describe("Test gameEngine", () => {
  it("returns null if isPlaying is false", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = false;
    testProps.keepDealing = jest.fn();

    const result = gameEngine(testProps);
    expect(result).toEqual(null);
  });

  it("calls keepDealing when the hands are empty and isPlaying is true", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = true;
    testProps.keepDealing = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();

    expect(testProps.keepDealing).toHaveBeenCalled();

    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();
  });

  it("calls keepDealing when the dealer has only one card and isPlaying is true", () => {
    const testProps = { ...mockProps };
    testProps.player.hands = [["H7", "D4"]];
    testProps.dealer.hand = ["CA"];
    testProps.turn.isPlaying = true;
    testProps.keepDealing = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();

    expect(testProps.keepDealing).toHaveBeenCalled();

    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();
  });

  it("calls giveCard when the player needs cards, a card is drawn and isPlaying is true", () => {
    const testProps = { ...mockProps };
    testProps.turn.playersTurn = 1;
    testProps.deck.drawnCard = "C5";
    testProps.player.hands = [["H7"]];
    testProps.dealer.hand = ["CA", "C4"];
    testProps.turn.isPlaying = true;
    testProps.giveCard = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();
    expect(testProps.keepDealing).not.toHaveBeenCalled();
    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.play).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();

    expect(testProps.giveCard).toHaveBeenCalled();
  });

  it("calls giveDealerCard when the dealer needs cards, a card is drawn and isPlaying is true", () => {
    const testProps = { ...mockProps };
    testProps.turn.playersTurn = 0;
    testProps.deck.drawnCard = "C5";
    testProps.player.hands = [["H7", "D4"]];
    testProps.dealer.hand = ["CA"];
    testProps.turn.isPlaying = true;
    testProps.giveDealerCard = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();
    expect(testProps.keepDealing).not.toHaveBeenCalled();
    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.play).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();

    expect(testProps.giveDealerCard).toHaveBeenCalled();
  });

  it("calls nextPlayer when isPlaying is true, the dealer has two cards and playersTurn equals 0", () => {
    const testProps = { ...mockProps };
    testProps.player.hands = [["H7", "D4"]];
    testProps.dealer.hand = ["CA", "D9"];
    testProps.deck.drawnCard = null;
    testProps.turn.isPlaying = true;
    testProps.nextPlayer = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();
    expect(testProps.keepDealing).not.toHaveBeenCalled();

    expect(testProps.nextPlayer).toHaveBeenCalled();

    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();
  });

  it("returns when isPlaying is true, the dealer has two cards and playersTurn equals 1", () => {
    const testProps = { ...mockProps };
    testProps.player.hands = [["H7", "D4"]];
    testProps.dealer.hand = ["CA", "D9"];
    testProps.turn.isPlaying = true;
    testProps.turn.playersTurn = 1;
    testProps.nextPlayer = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();
    expect(testProps.keepDealing).not.toHaveBeenCalled();
    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();
  });

  describe("Test that dealerTurn is called when expected", () => {
    it("calls dealerTurn when isPlaying is true, the dealer has two cards, playersTurn equals 1 and the player stands", () => {
      const testProps = { ...mockProps };
      testProps.player.playerStands[0] = true;
      testProps.player.busted[0] = false;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H7", "D4"]];
      testProps.dealer.hand = ["CA", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 1;
      testProps.dealerTurn = jest.fn();

      gameEngine(testProps);
      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();
      expect(testProps.stop).not.toHaveBeenCalled();
      expect(testProps.winBet).not.toHaveBeenCalled();

      expect(testProps.dealerTurn).toHaveBeenCalled();
    });

    it("calls dealerTurn when isPlaying is true, the dealer has two cards, playersTurn equals 1 and the player is busted", () => {
      const testProps = { ...mockProps };
      testProps.player.playerStands[0] = false;
      testProps.player.busted[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H7", "D4"]];
      testProps.dealer.hand = ["CA", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 1;
      testProps.dealerTurn = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).toHaveBeenCalled();

      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();
      expect(testProps.stop).not.toHaveBeenCalled();
      expect(testProps.winBet).not.toHaveBeenCalled();
    });

    it("calls dealerTurn when isPlaying is true, the dealer has two cards, playersTurn equals 1 and the player has blackjack", () => {
      const testProps = { ...mockProps };
      testProps.player.playerStands[0] = false;
      testProps.player.busted[0] = false;
      testProps.player.hasBlackjack[0] = true;
      testProps.player.hands = [["H7", "D4"]];
      testProps.dealer.hand = ["CA", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 1;
      testProps.dealerTurn = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).toHaveBeenCalled();

      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();
      expect(testProps.stop).not.toHaveBeenCalled();
      expect(testProps.winBet).not.toHaveBeenCalled();
    });
  });

  describe("Test that the appropriate action is called when the player's turn is over", () => {
    it("calls dealerTurn when isPlaying is true, the dealer has two cards, playersTurn equals 0 and the player stands", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["HJ", "D4"]];
      testProps.dealer.hand = ["C4", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.hitOnClick = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).not.toHaveBeenCalled();

      expect(testProps.hitOnClick).toHaveBeenCalled();

      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();
      expect(testProps.stop).not.toHaveBeenCalled();
      expect(testProps.winBet).not.toHaveBeenCalled();
    });

    it("calls stop when isPlaying is true, the dealer has two cards, playersTurn equals 0 and the player is busted", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = true;
      testProps.player.playerStands[0] = false;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["HJ", "D4"]];
      testProps.dealer.hand = ["C4", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).not.toHaveBeenCalled();
      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();

      expect(testProps.stop).toHaveBeenCalled();

      expect(testProps.winBet).not.toHaveBeenCalled();
    });

    it("calls stop when isPlaying is true, the dealer has two cards, playersTurn equals 0 and the player has blackjack", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = false;
      testProps.player.hasBlackjack[0] = true;
      testProps.player.hands = [["HA", "DJ"]];
      testProps.dealer.hand = ["C4", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).not.toHaveBeenCalled();
      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();

      expect(testProps.stop).toHaveBeenCalled();

      expect(testProps.winBet).not.toHaveBeenCalled();
    });
  });

  describe("Test that the dealer's turn is handled properly", () => {
    it("stops playing the dealers turn when the dealer has 17 or more", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H3", "DJ"]]; // 13
      testProps.dealer.hand = ["C8", "D9"]; // 17
      testProps.player.score[0] = 13;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).not.toHaveBeenCalled();

      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();

      expect(testProps.stop).toHaveBeenCalled();

      expect(testProps.winBet).not.toHaveBeenCalled();
    });
  });

  describe("Handles scoring properly once the game has ended", () => {
    it("calculates a player bust properly", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = true;
      testProps.player.playerStands[0] = false;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H3", "DJ", "SK"]]; // 23
      testProps.dealer.hand = ["C8", "D9"]; // 17
      testProps.player.score[0] = 23;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Bust");
    });

    it("calculates a push properly", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H7", "DJ"]]; // 17
      testProps.dealer.hand = ["C8", "D9"]; // 17
      testProps.player.score[0] = 17;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Push");
    });

    it("calculates player blackjack properly", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = true;
      testProps.player.hands = [["HA", "DJ"]]; // 21
      testProps.dealer.hand = ["C8", "D9"]; // 17
      testProps.player.score[0] = 21;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Blackjack");
    });

    it("calculates a losing score properly when the dealer has an ace", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H8", "DJ"]]; // 18
      testProps.dealer.hand = ["CQ", "D7"]; // 17
      testProps.player.score[0] = 18;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Won");
    });

    it("calculates a losing score properly when the dealer has an ace", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H8", "DJ"]]; // 18
      testProps.dealer.hand = ["CA", "D9"]; // 19
      testProps.player.score[0] = 18;
      testProps.dealer.score = 19;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Lost");
    });

    it("calculates a winning score properly", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H8", "DJ"]]; // 18
      testProps.dealer.hand = ["C8", "D9"]; // 17
      testProps.player.score[0] = 18;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Won");
    });

    it("calculates a winning score properly when the dealer has an ace", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H8", "DJ"]]; // 18
      testProps.dealer.hand = ["CA", "D9"]; // 20
      testProps.player.score[0] = 18;
      testProps.dealer.score = 20;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Lost");
    });

    it("calculates a losing score properly", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = false;
      testProps.player.playerStands[0] = true;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["H3", "DJ"]]; // 13
      testProps.dealer.hand = ["C8", "D9"]; // 17
      testProps.player.score[0] = 13;
      testProps.dealer.score = 17;
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.stop = jest.fn();

      const result = gameEngine(testProps);
      expect(result).toEqual("Lost");
    });
  });

  it("passes a special test", () => {
    const testProps = { ...mockProps };
    testProps.player.busted[0] = false;
    testProps.player.playerStands[0] = true;
    testProps.player.hasBlackjack[0] = false;
    testProps.player.hands = [["H3", "DJ"]]; // 13
    testProps.player.score[0] = 13;

    testProps.player = {
      balance: 495,
      busted: [false],
      currentBet: 5,
      handIndex: 0,
      hands: [[]],
      hasBlackjack: [false],
      hasInsurance: [false],
      playerIndex: 1,
      playerStands: [true],
      score: [16],
      splitHand: false
    };

    testProps.dealer = {
      avatar: "./images/dealer.png",
      busted: true,
      hand: ["DJ", "C3", "C10"],
      handFlipped: false,
      hasBlackjack: false,
      name: "Dealer",
      score: 23
    };

    testProps.turn = {
      isPlaying: true,
      numPlayers: 2,
      playersTurn: 1
    };

    testProps.stop = jest.fn();

    const result = gameEngine(testProps);
    expect(result).toEqual(null);
  });
});
