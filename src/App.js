import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';

import PlayField from './PlayField/PlayField'
import Profile from './Profile/Profile'
import ControlPanel from './ControlPanel/ControlPanel'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Jack</h1>
        </header>
        <PlayField />
        <Profile />
        <ControlPanel />
      </div>
    );
  }
}

export default connect()(App);
