require('babel-polyfill');
require('whatwg-fetch'); // fetch() polyfill for making API calls.
require('normalize.css');
require('../styles/main.css');
require('./style.js');

if (/\:8081/.test(window.location.host)) {
  window.apiUrl = 'http://127.0.0.1:3000/api';
  window.oauthUrl = 'http://127.0.0.1:3000/oauth';
  window.ws = '127.0.0.1:8000';
} else {
  window.apiUrl = window.location.origin + '/api';
  window.oauthUrl = window.location.origin + '/oauth';
  window.ws = window.location.hostname + ':' + window.wsPort;
}

import React from 'react';
import { default as dom } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { theme } from 'mcs-lite-theme';
import reducers from '../reducers';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
import IntlProvider from '../containers/intlProvider';

const store = createStore(reducers, applyMiddleware(thunk));
import routes from '../routes/routing';

var oauth = require('../../../configs/oauth');
var clientId = oauth.webClient.clientId;
var clientSecret = oauth.webClient.secret;
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');
window.basic_token = basic_token;

import '../utils/i18n';
import '../images/favicon.ico';

if (document && document.getElementById('app')) {
  dom.render(
    <Provider store={store}>
      <IntlProvider defaultLocale="zh-TW">
        <ThemeProvider theme={theme}>
          <Router history={browserHistory} routes={routes} />
        </ThemeProvider>
      </IntlProvider>
    </Provider>,
    document.getElementById('app')
  );
}
