import assign from 'object-assign';
import actionTypes from '../constants/ActionTypes';
import deviceActionTypes from '../constants/DeviceActionTypes';

const initialState = {
  deviceList: [],
  deviceDetail: {},
};

export default function menus(state = initialState, action) {
  switch (action.type) {
    case deviceActionTypes.RETRIEVEDEVICE:
      return assign({}, state, { deviceDetail: action.data });
    case deviceActionTypes.RETRIEVEDEVICELIST:
      return assign({}, state, { deviceList: action.data });
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
}
