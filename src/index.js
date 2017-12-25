import React from 'react';
import ReactDOM from 'react-dom';

/* Local Imports */
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* Styles */
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

/* Redux */
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'

ReactDOM.render(
    <Provider store={createStore(rootReducer)} >
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
