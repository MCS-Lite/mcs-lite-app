import {
  OPEN_EDITDEVICE,
  CLOSE_EDITDEVICE,
} from '../constants/DeviceActionTypes';
import assign from 'object-assign';

const initialState = {
  editDevice: false,
}

export default function menus( state = initialState, action ) {
  switch ( action.type ) {
    case OPEN_EDITPROTOTYPE:
      return assign({}, state, { editDevice: true });
    case CLOSE_EDITPROTOTYPE:
      return assign({}, state, { editDevice: false });
    default:
      return state;
  }
}
