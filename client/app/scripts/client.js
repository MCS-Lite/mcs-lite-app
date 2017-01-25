require('babel/polyfill');
require('../styles/main.css');
import React from 'react';
import Footer from '@mtk/mcs-components/lib/Footer';
import Header from '@mtk/mcs-components/lib/Header';
import { default as dom } from 'react-dom';

import App from '../components/app';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
// import Routr from '../routes/routr';
import promiseMiddleware from '../utils/promiseMiddleware';

// const composedReducers = combineReducers(reducers);
const store = createStore(reducers, applyMiddleware(thunk));
import routes from '../routes/routing';

window.apiUrl = 'http://localhost:3000';

var oauth = require('../../../configs/oauth');
var clientId;
var clientSecret;
Object.keys(oauth.clients).forEach(function(key) { clientId = key; clientSecret = oauth.clients[key].secret });
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');
window.basic_token = basic_token;

console.log(store.getState());

if (document && document.getElementById('app')) {
  dom.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
}
