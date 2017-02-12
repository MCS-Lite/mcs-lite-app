require('babel/polyfill');
require('../styles/main.css');

if (/\:8081/.test(window.location.host)) {
  window.apiUrl = 'http://localhost:3000/api';
  window.oauthUrl = 'http://localhost:3000/oauth';
} else {
  window.apiUrl = window.location.origin + '/api';
  window.oauthUrl = window.location.origin + '/oauth';
}

import React from 'react';
import Footer from '@mtk/mcs-components/lib/Footer';
import Header from '@mtk/mcs-components/lib/Header';
import { default as dom } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { Router, Route, RouterContext, browserHistory } from 'react-router';

const store = createStore(reducers, applyMiddleware(thunk));
import routes from '../routes/routing';

var oauth = require('../../../configs/oauth');
var clientId;
var clientSecret;
Object.keys(oauth.clients).forEach(function(key) { clientId = key; clientSecret = oauth.clients[key].secret });
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');

window.basic_token = basic_token;

if (document && document.getElementById('app')) {
  dom.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
}
