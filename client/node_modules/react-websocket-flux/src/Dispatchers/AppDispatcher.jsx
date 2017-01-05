import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
	handleViewAction(action) {
		this.dispatch({
			action: action
		});
	};
};

module.exports = new AppDispatcher();;