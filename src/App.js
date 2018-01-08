import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";

import "./App.css";

import PlayField from "./PlayField/PlayField";
import Profile from "./Profile/Profile";
import ControlPanel from "./ControlPanel/ControlPanel";

import { newDeck, shuffle, drawOne, clearCard } from "./actions/deckActions";
import { play, stop, nextPlayer, dealerTurn } from "./actions/turnActions";
import {
  setName,
  setAvatar,
  setStatus,
  clearHands,
  nextHand,
  setDoubleDown,
  setSplitHand
} from "./actions/playerActions";
import {
  takeCard,
  dealerTakeCard,
  stand,
  buyChips,
  setBet,
  winBet,
  deductBet,
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
    setStatus: status => {
      dispatch(setStatus({ status }));
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
    play: () => {
      dispatchAll(dispatch, [play, dealerTurn, nextPlayer]);
    },
    stop: () => {
      dispatchAll(dispatch, [stop, dealerTurn]);
    },
    dealerTurn: () => {
      dispatch(dealerTurn());
    },
    nextPlayer: () => {
      dispatch(nextPlayer());
    },
    hitOnClick: () => {
      dispatch(drawOne());
    },
    nextHand: () => {
      dispatch(nextHand());
    },
    standOnClick: () => {
      dispatch(stand());
    },
    splitOnClick: () => {
      // Not sure what to do here yet
      // the player store is configured to accept multiple hands though
      dispatch(setSplitHand());
    },
    doubleDownOnClick: () => {
      dispatchAll(dispatch, [setDoubleDown, deductBet, drawOne, stand]);
    },
    buyInsuranceOnClick: () => {
      dispatch(setInsured());
    },
    dealOnClick: () => {
      // Use a new deck every time so the cards can't be counted
      dispatchAll(dispatch, [clearHands, deductBet, newDeck, shuffle, play]);
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
