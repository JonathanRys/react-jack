import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";

import "./App.css";

import PlayField from "./PlayField/PlayField";
import Profile from "./Profile/Profile";
import ControlPanel from "./ControlPanel/ControlPanel";

import { newDeck, shuffle, drawOne, clearCard } from "./actions/deckActions";
import { play, nextPlayer, dealerTurn } from "./actions/turnActions";
import {
  flipHand,
  setName,
  setAvatar,
  clearHands
} from "./actions/playerActions";
import {
  takeCard,
  dealerTakeCard,
  stand,
  buyChips,
  setBet,
  winBet,
  loseBet,
  setInsured
} from "./actions/playerActions";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    deck: state.deck,
    turn: state.turn,
    player: state.player,
    dealer: state.dealer
  };
};

const dispatchAll = (dispatch, actions) => {
  actions.map(action => {
    return dispatch(action());
  });
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => {
      dispatch(setName({ name }));
    },
    setAvatar: avatar => {
      dispatch(setAvatar({ avatar }));
    },
    buyChips: newChips => {
      dispatch(buyChips({ newChips }));
    },
    setBet: newBet => {
      dispatch(setBet({ newBet }));
    },
    winBet: multiplier => {
      dispatch(winBet({ multiplier }));
    },
    loseBet: () => {
      dispatch(loseBet());
    },
    dealerTurn: () => {
      dispatchAll(dispatch, [dealerTurn, flipHand]);
    },
    nextPlayer: () => {
      dispatch(nextPlayer());
    },
    hitOnClick: () => {
      dispatch(drawOne());
    },
    standOnClick: () => {
      dispatch(stand());
    },
    splitOnClick: () => {
      // Not sure what to do here yet
    },
    doubleDownOnClick: () => {
      dispatchAll(dispatch, [drawOne, flipHand, dealerTurn]);
    },
    buyInsuranceOnClick: () => {
      dispatch(setInsured());
    },
    dealOnClick: () => {
      dispatchAll(dispatch, [clearHands, play, newDeck, shuffle]);
    },
    keepDealing: () => {
      dispatchAll(dispatch, [nextPlayer, drawOne]);
    },
    giveCard: card => {
      dispatch(takeCard({ card }));
      dispatch(clearCard());
    },
    giveDealerCard: card => {
      dispatch(dealerTakeCard({ card }));
      dispatch(clearCard());
    },
    clearHands: () => {
      dispatch(clearHands());
    }
  };
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <div className="App-logo" />React Jack
          </h1>
        </header>
        <Container>
          <Row>
            <Col xs="12" xl="3">
              <Profile
                {...this.props.player}
                setName={this.props.setName}
                setAvatar={this.props.setAvatar}
              />
            </Col>
            <Col xs="12" xl="6">
              <PlayField {...this.props} />
            </Col>
            <Col xs="12" xl="3">
              <ControlPanel {...this.props} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
