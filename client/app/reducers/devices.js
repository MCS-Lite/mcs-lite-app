import deviceActionTypes from '../constants/DeviceActionTypes';
import assign from 'object-assign';

const initialState = {
  deviceList: [],
  deviceDetail: {},
};

export default function menus( state = initialState, action ) {
  switch ( action.type ) {
    case deviceActionTypes.RETRIEVEDEVICE:
      return assign({}, state, { deviceDetail: action.data });
    case deviceActionTypes.RETRIEVEDEVICELIST:
      return assign({}, state, { deviceList: action.data });
    default:
      return state;
  }
}
