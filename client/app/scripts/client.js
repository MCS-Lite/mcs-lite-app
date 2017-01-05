require('babel/polyfill');
require('../styles/main.css');
import React from 'react';
import Footer from '@mtk/mcs-components/lib/Footer';
import Header from '@mtk/mcs-components/lib/Header';
import { default as dom } from 'react-dom';

import App from '../components/app';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import Routr from '../routes/routr';
import promiseMiddleware from '../utils/promiseMiddleware';

// const composedReducers = combineReducers(reducers);
const store = createStore(reducers);
new Routr(store);
// const finalCreateStore = applyMiddleware( promiseMiddleware )(createStore);
// let store = finalCreateStore(composedReducers, state);

console.log(store.getState());

if (document && document.getElementById('app')) {
  dom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}
