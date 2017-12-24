import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'

import './App.css';

import CardTable from './CardTable/CardTable'
import Profile from './Profile/Profile'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to our Casino</h1>
        </header>
        <CardTable />
        <Profile />

      </div>
    );
  }
}

export default connect()(App);
