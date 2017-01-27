import {
  RETRIEVEDEVICELIST,
  RETRIEVEDEVICE,
} from '../constants/DeviceActionTypes';
import assign from 'object-assign';

const initialState = {
  deviceList: [],
  deviceDetail: {},
}

export default function menus( state = initialState, action ) {
  switch ( action.type ) {
    case RETRIEVEDEVICE:
      return assign({}, state, { deviceDetail: action.data });
    case RETRIEVEDEVICELIST:
      return assign({}, state, { deviceList: action.data });
    default:
      return state;
  }
}
