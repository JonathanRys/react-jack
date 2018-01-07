export default function gameEngine(nextProps) {
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
    nextProps.keepDealing();
    return null;
  }

  if (nextProps.turn.playersTurn) {
    // It's the player's turn, but check if that should change
    if (dealersTurn) {
      nextProps.dealerTurn();
    }
    // check for dealer blackjack in the control panel
    return null;
  } else if (dealersTurn) {
    // It's still the dealer's turn - hit until 17
    if (nextProps.dealer.score < 17) {
      // Don't bother drawing if the player is busted or has blackjack
      if (nextProps.player.busted[index]) {
        nextProps.stop();
        return "Bust";
      } else if (nextProps.player.hasBlackjack[index]) {
        nextProps.stop();
        nextProps.winBet(2.5);
        return "Blackjack";
      }
      // Draw a card
      nextProps.hitOnClick();
      return null;
    } else {
      // Stop playing
      nextProps.stop();

      // Score the player's hand
      if (playerScore > 21) {
        // Busted
        return "Bust";
      } else if (playerScore === dealerScore) {
        nextProps.winBet(nextProps.player.doubledDown ? 2 : 1);
        // Push
        return "Push";
      } else if (nextProps.player.hasBlackjack[index]) {
        // Blackjack
        nextProps.winBet(2.5);
        return "Blackjack";
      } else if (dealerScore > 21 || playerScore > dealerScore) {
        // Won
        nextProps.winBet(nextProps.player.doubledDown ? 4 : 2);
        return "Won";
      } else {
        // Lost
        return "Lost";
      }
    }
  } else {
    // The turn has ended, awaiting user input
    nextProps.nextPlayer();
    return null;
  }
}
