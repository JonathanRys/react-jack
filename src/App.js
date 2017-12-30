import React, { Component } from 'react';

import './App.css';

import PlayField from './PlayField/PlayField'
import Profile from './Profile/Profile'
import ControlPanel from './ControlPanel/ControlPanel'

import { newDeck, shuffle, drawOne } from './actions/deckActions'
import { play, nextPlayer } from './actions/turnActions'
import { takeCard, dealerTakeCard } from './actions/playerActions'
import { clearCard } from './actions/deckActions'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log("state:", state)
  return {
    deck: state.deck,
    turn: state.turn,
    player: state.player,
    dealer: state.dealer,
  }
}

const dispatchAll = (dispatch, actions) => {
  actions.map((action) => { return dispatch(action()) })
}

const mapDispatchToProps = (dispatch) => {
  return {
    drawOne: () => {
      console.log("Drawing one")
      dispatch(drawOne())
    },
    dealOnClick: () => {
      console.log("DEAL clicked")
      dispatchAll(dispatch, [play, newDeck, shuffle])
    },
    keepDealing: () => {
      dispatchAll(dispatch, [drawOne, nextPlayer])
    },
    giveCard: (card) => { dispatch(takeCard(card)) },
    giveDealerCard: (card) => { dispatch(dealerTakeCard(card)) },
    clearCard: () => { dispatch(clearCard()) },
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Jack</h1>
        </header>
        <Profile { ...this.props.player} />
        <PlayField { ...this.props} />
        <ControlPanel { ...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// hitOnClick: () => {
//   dispatch(drawOne())
// },
// standOnClick: () => { },
// splitOnClick: () => { },
// doubleDownOnClick: () => { },
// buyInsuranceOnClick: () => { },
// dealOnClick: () => {
//   console.log("DEAL clicked")
//   dispatchAll(dispatch, [play, newDeck, shuffle])
// },
// keepDealing: () => {
//   dispatchAll(dispatch, [drawOne, nextPlayer])
// }
// 