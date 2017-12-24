import React from 'react';

import App from './App';
import { shallow } from 'enzyme'

import { createStore } from 'redux'
import rootReducer from './reducers/index'

it('renders without crashing', () => {
  const wrapper = shallow((<App store={createStore(rootReducer)} />))
});
