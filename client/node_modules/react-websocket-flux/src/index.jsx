import React from 'react';
import { render } from 'react-dom';

import AppDispatcher from './Dispatchers/AppDispatcher';
import AppStore from './Stores/AppStore';
import { AppActions } from './Actions/AppActions';

module.exports = {
	WebsocketDispatcher: AppDispatcher,
	WebsocketStore: AppStore,
	WebsocketActions: AppActions
};