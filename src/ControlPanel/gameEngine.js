export default function gameEngine(nextProps) {
  let outcome = "";

  const index = nextProps.player.handIndex;
  const dealersTurn =
    nextProps.player.playerStands[index] ||
    nextProps.player.busted[index] ||
    nextProps.player.hasBlackjack[index];

  const dealerScore = nextProps.dealer.score;
  const playerScore = nextProps.player.score[index];

  // Thunk this
  console.log("drawnCard:", nextProps.deck.drawnCard);

  if (!nextProps.turn.isPlaying) {
    if (
      nextProps.dealer.hand.length < 2 ||
      nextProps.player.hands[0].length < 2
    ) {
      console.log("Drawing a card");
      console.log("dealer:", nextProps.dealer.hand);
      console.log("player:", nextProps.player.hands[0]);

      // Deal the cards
      nextProps.keepDealing();
    }
    return;
  }

  if (nextProps.turn.playersTurn) {
    // It's the player's turn, but check if that should change
    if (dealersTurn) {
      nextProps.dealerTurn();
    }
    return;
  } else if (dealersTurn) {
    // It's still the dealer's turn - hit until 17
    if (nextProps.dealer.score < 17) {
      // Don't bother drawing if the player is busted or has blackjack
      if (nextProps.player.busted[index]) {
        nextProps.stop();
        return;
      } else if (nextProps.player.hasBlackjack[index]) {
        nextProps.stop();
        return;
      }
      nextProps.hitOnClick();
      return;
    } else {
      nextProps.stop();

      if (dealersTurn && !nextProps.turn.playersTurn) {
        //Take dealer's turn
        console.log("Looks like it's the dealer's turn:");
        nextProps.dealerTurn();

        if (playerScore > 21) {
          outcome = "Bust";
        } else if (playerScore === dealerScore) {
          outcome = "Push";
          nextProps.winBet();
        } else if (nextProps.player.hasBlackJack[index]) {
          outcome = "BlackJack";
          nextProps.winBet(2.5);
        } else if (dealerScore > 21 || playerScore > dealerScore) {
          outcome = "Won";
          nextProps.winBet(2);
        } else {
          outcome = "Lost";
        }
        return outcome;
      }
    }
  } else {
    // The turn has ended, awaiting user input
    nextProps.nextPlayer();
    return;
  }
}
