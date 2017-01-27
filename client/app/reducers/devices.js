import {
  RETRIEVEDEVICELIST,
} from '../constants/DeviceActionTypes';
import assign from 'object-assign';

const initialState = {
  deviceList: [],
}

export default function menus( state = initialState, action ) {
  switch ( action.type ) {
    case RETRIEVEDEVICELIST:
      return assign({}, state, { deviceList: action.data });
    default:
      return state;
  }
}
