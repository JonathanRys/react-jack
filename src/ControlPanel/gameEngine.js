export default function gameEngine(nextProps) {
  let outcome = "";

  const index = nextProps.player.handIndex;
  const dealersTurn =
    nextProps.player.playerStands[index] ||
    nextProps.player.busted[index] ||
    nextProps.player.hasBlackjack[index];

  const dealerScore = nextProps.dealer.score;
  const playerScore = nextProps.player.score[index];

  // Don't use the game engine if the game is over
  if (!nextProps.turn.isPlaying) return null;

  // If there is a drawn card, take it, clear it and await new props
  if (nextProps.deck.drawnCard) {
    if (nextProps.turn.playersTurn) {
      nextProps.giveCard(nextProps.deck.drawnCard);
    } else {
      nextProps.giveDealerCard(nextProps.deck.drawnCard);
    }
    return null;
  }

  // Since we're playing, see if the players have all their cards
  if (
    nextProps.dealer.hand.length < 2 ||
    nextProps.player.hands[0].length < 2
  ) {
    // Deal the cards
    console.log("keepDealing");
    nextProps.keepDealing();
    return null;
  }

  // console.log("Playing", nextProps);
  if (nextProps.turn.playersTurn) {
    // It's the player's turn, but check if that should change
    if (dealersTurn) {
      nextProps.dealerTurn();
    }
    return null;
  } else if (dealersTurn) {
    // It's still the dealer's turn - hit until 17
    if (nextProps.dealer.score < 17) {
      // Don't bother drawing if the player is busted or has blackjack
      if (nextProps.player.busted[index]) {
        nextProps.stop();
        return null;
      } else if (nextProps.player.hasBlackjack[index]) {
        nextProps.stop();
        return null;
      }
      // Draw a card
      nextProps.hitOnClick();
      return null;
    } else {
      // Stop playing and...
      // console.log("stop playing:", nextProps);
      nextProps.stop();
      // Score the player's hand
      if (playerScore > 21) {
        outcome = "Bust";
      } else if (playerScore === dealerScore) {
        outcome = "Push";
        nextProps.winBet();
      } else if (nextProps.player.hasBlackjack[index]) {
        outcome = "Blackjack";
        nextProps.winBet(2.5);
      } else if (dealerScore > 21 || playerScore > dealerScore) {
        outcome = "Won";
        nextProps.winBet(2);
      } else {
        outcome = "Lost";
      }
      return outcome;
    }
  } else {
    // The turn has ended, awaiting user input
    nextProps.nextPlayer();
    return null;
  }
}
