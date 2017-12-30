import React from 'react';

import App from '../App';
import { shallow } from 'enzyme'

import { createStore } from 'redux'
import rootReducer from '../reducers/index'

describe("Test the App component", () => {
  it('renders without crashing', () => {
    const component = shallow((<App store={createStore(rootReducer)} />))
    expect(component).toMatchSnapshot()
  });
})
