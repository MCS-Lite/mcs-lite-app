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
import { default as dom } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
import IntlProvider from '../containers/IntlProvider';

const store = createStore(reducers, applyMiddleware(thunk));
import routes from '../routes/routing';

var oauth = require('../../../configs/oauth');
var clientId = oauth.webClient.clientId;
var clientSecret = oauth.webClient.secret;
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');
window.basic_token = basic_token;

import '../utils/i18n';

if (document && document.getElementById('app')) {
  dom.render(
    <Provider store={store}>
      <IntlProvider defaultLocale="zh-TW">
        <Router history={browserHistory} routes={routes} />
      </IntlProvider>
    </Provider>,
    document.getElementById('app')
  );
}
