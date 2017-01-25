import {
  CHECKTOKEN,
} from '../constants/ActionTypes';

const initialState = {
  userId: '',
  access_token: '',
  token: '',
}

export default function main( state = initialState, action ) {
  switch ( action.type ) {
    case CHECKTOKEN:
      return assign({}, state, { userId: action.userId, access_token: action.access_token, token: action.token });
    default:
      return state;
  }
}
