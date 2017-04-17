require('babel-polyfill');
require('../styles/main.css');

if (/\:8081/.test(window.location.host)) {
  window.apiUrl = 'http://localhost:3000/api';
  window.oauthUrl = 'http://localhost:3000/oauth';
  window.ws = 'localhost:8000';
} else {
  window.apiUrl = window.location.origin + '/api';
  window.oauthUrl = window.location.origin + '/oauth';
  window.ws = window.location.hostname + ':8000'
}

import React from 'react';
import { default as dom } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { theme } from 'mcs-lite-theme';
import reducers from '../reducers';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
import IntlProvider from '../containers/IntlProvider';

const store = createStore(reducers, applyMiddleware(thunk));
import routes from '../routes/routing';

import '../utils/i18n';

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
