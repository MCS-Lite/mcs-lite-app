import {
  OPEN_EDITPROTOTYPE,
  CLOSE_EDITPROTOTYPE,
} from '../constants/PrototypeActionTypes';
import assign from 'object-assign';

const initialState = {
  editPrototype: false,
  addNewPrototype: false,
}

export default function prototypes( state = initialState, action ) {
  switch ( action.type ) {
    case OPEN_EDITPROTOTYPE:
      return assign({}, state, { editPrototype: true });
    case CLOSE_EDITPROTOTYPE:
      return assign({}, state, { editPrototype: false });
    default:
      return state;
  }
}
