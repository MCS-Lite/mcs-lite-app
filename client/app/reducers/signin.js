import {
  ERRORMSG,
} from '../constants/LoginTypes';
import assign from 'object-assign';

const initialState = {
  errorMsg: '',
};

export default function login( state = initialState, action ) {
  switch ( action.type ) {
    case ERRORMSG:
      return assign({}, state, { errorMsg: action.errorMsg });
    default:
      return state;
  }
}
