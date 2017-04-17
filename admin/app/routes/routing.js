import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app';

export default (
  <Route component={App}>
    <Route
      path="/"
      components={App}
    />
  </Route>
);
