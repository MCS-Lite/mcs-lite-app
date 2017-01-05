import AppDispatcher from '../Dispatchers/AppDispatcher';
import { EventEmitter } from 'events';

var MESSAGE_EVENT = 'onmessage';

class AppStore extends EventEmitter {
	emitMessage(item) {
		this.emit(MESSAGE_EVENT, item);
	}

	/**
	 * @param {function} callback
	 */
	addMessageListener(callback) {
		this.on(MESSAGE_EVENT, callback);
	}

	/**
	 * @param {function} callback
	 */
	removeMessageListener(callback) {
		this.removeListener(MESSAGE_EVENT, callback);
	}
}

AppDispatcher.register(function(payload) {
	let action = payload.action;

	switch(action.actionType) {
		case 'WEBSOCKET_DATA':
			appStore.emitMessage(action.item);
			break;
	}

	return true;
});

let appStore = new AppStore();

module.exports = appStore;