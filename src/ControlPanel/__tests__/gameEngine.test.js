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
  stop: jest.fn(),
  winBet: jest.fn()
};

describe("Test gameEngine", () => {
  it("calls keepDealing when the hands are empty and isPlaying is false", () => {
    const testProps = { ...mockProps };
    testProps.turn.isPlaying = false;
    testProps.keepDealing = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();

    expect(testProps.keepDealing).toHaveBeenCalled();

    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();
  });

  it("calls keepDealing when the dealer has only one card and isPlaying is false", () => {
    const testProps = { ...mockProps };
    testProps.player.hands = [["H7", "D4"]];
    testProps.dealer.hand = ["CA"];
    testProps.turn.isPlaying = false;
    testProps.keepDealing = jest.fn();

    gameEngine(testProps);
    expect(testProps.dealerTurn).not.toHaveBeenCalled();
    expect(testProps.hitOnClick).not.toHaveBeenCalled();

    expect(testProps.keepDealing).toHaveBeenCalled();

    expect(testProps.nextPlayer).not.toHaveBeenCalled();
    expect(testProps.stop).not.toHaveBeenCalled();
    expect(testProps.winBet).not.toHaveBeenCalled();
  });

  it("calls nextPlayer when isPlaying is true, the dealer has two cards and playersTurn equals 0", () => {
    const testProps = { ...mockProps };
    testProps.player.hands = [["H7", "D4"]];
    testProps.dealer.hand = ["CA", "D9"];
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
      expect(testProps.dealerTurn).toHaveBeenCalled();

      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();
      expect(testProps.stop).not.toHaveBeenCalled();
      expect(testProps.winBet).not.toHaveBeenCalled();
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

  describe("test that hitOnClick is called when expected", () => {
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

    it("calls loseBet when isPlaying is true, the dealer has two cards, playersTurn equals 0 and the player is busted", () => {
      const testProps = { ...mockProps };
      testProps.player.busted[0] = true;
      testProps.player.playerStands[0] = false;
      testProps.player.hasBlackjack[0] = false;
      testProps.player.hands = [["HJ", "D4"]];
      testProps.dealer.hand = ["C4", "D9"];
      testProps.turn.isPlaying = true;
      testProps.turn.playersTurn = 0;
      testProps.loseBet = jest.fn();

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
      testProps.hitOnClick = jest.fn();

      gameEngine(testProps);
      expect(testProps.dealerTurn).not.toHaveBeenCalled();
      expect(testProps.hitOnClick).not.toHaveBeenCalled();
      expect(testProps.keepDealing).not.toHaveBeenCalled();
      expect(testProps.nextPlayer).not.toHaveBeenCalled();

      expect(testProps.stop).toHaveBeenCalled();

      expect(testProps.winBet).not.toHaveBeenCalled();
    });
  });
});
