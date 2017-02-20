'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppActions = undefined;

var _AppDispatcher = require('../Dispatchers/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _websocket2 = require('websocket');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _websocket = _websocket || {};

var AppActions = exports.AppActions = {
	/**
  * @param {string} Websocket URI
  */
	connect: function connect(uri) {
		if (typeof uri === 'undefined') {
			uri = 'ws://localhost:8000';
		}

		_websocket = (0, _objectAssign2.default)(new _websocket2.w3cwebsocket(uri), {
			onopen: function onopen() {},

			onmessage: function onmessage(payload) {
				if (typeof payload.data === 'string') {
					AppActions.create(JSON.parse(payload.data));
				}
			}
		});
	},

	/**
  * @param {object} Data to be packaged to action
  */
	create: function create(item) {
		_AppDispatcher2.default.handleViewAction({
			actionType: 'WEBSOCKET_DATA',
			item: item
		});
	}
};
//# sourceMappingURL=AppActions.js.map
