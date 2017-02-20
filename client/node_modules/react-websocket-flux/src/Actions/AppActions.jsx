import AppDispatcher from '../Dispatchers/AppDispatcher';
import { w3cwebsocket } from 'websocket';
import assign from 'object-assign';

let _websocket = _websocket || {};

export const AppActions = {
	/**
	 * @param {string} Websocket URI
	 */
	connect: (uri) => {
		if (typeof uri === 'undefined') {
			uri = 'ws://localhost:8000';
		}

		_websocket = assign(new w3cwebsocket(uri), {
			onopen: () => {
			},
			
			onmessage: (payload) => {
			    if (typeof payload.data === 'string') {
			        AppActions.create(JSON.parse(payload.data));
			    }
			}
		});		
	},

	/**
	 * @param {object} Data to be packaged to action
	 */
	create: (item) => {
		AppDispatcher.handleViewAction({
			actionType: 'WEBSOCKET_DATA',
			item: item
		});
	}
}