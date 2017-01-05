'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AppDispatcher = require('../Dispatchers/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MESSAGE_EVENT = 'onmessage';

var AppStore = function (_EventEmitter) {
	_inherits(AppStore, _EventEmitter);

	function AppStore() {
		_classCallCheck(this, AppStore);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AppStore).apply(this, arguments));
	}

	_createClass(AppStore, [{
		key: 'emitMessage',
		value: function emitMessage(item) {
			this.emit(MESSAGE_EVENT, item);
		}

		/**
   * @param {function} callback
   */

	}, {
		key: 'addMessageListener',
		value: function addMessageListener(callback) {
			this.on(MESSAGE_EVENT, callback);
		}

		/**
   * @param {function} callback
   */

	}, {
		key: 'removeMessageListener',
		value: function removeMessageListener(callback) {
			this.removeListener(MESSAGE_EVENT, callback);
		}
	}]);

	return AppStore;
}(_events.EventEmitter);

_AppDispatcher2.default.register(function (payload) {
	var action = payload.action;

	switch (action.actionType) {
		case 'WEBSOCKET_DATA':
			appStore.emitMessage(action.item);
			break;
	}

	return true;
});

var appStore = new AppStore();

module.exports = appStore;
//# sourceMappingURL=AppStore.js.map
