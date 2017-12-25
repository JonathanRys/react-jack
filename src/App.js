import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'

import './App.css';

import CardTable from './CardTable/CardTable'
import Profile from './Profile/Profile'
import ControlPanel from './ControlPanel/ControlPanel'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Our Blackjack Table</h1>
        </header>
        <CardTable />
        <Profile />
        <ControlPanel />
      </div>
    );
  }
}

export default connect()(App);
