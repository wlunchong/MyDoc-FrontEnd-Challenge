import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

// Apply react redux to store and load user saved character
// All data will be saved in redux store
// Refresh web page will erase all stored data as well

// Could be done using localStorage as well
// If so, need to call "Single Character" API when page reload

// So either way, i follow the instruction to get character data by calling "Character List" API and use redux instead.
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from "./reducers";

const store = createStore(rootReducer);
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
