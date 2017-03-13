import assign from 'object-assign';
import loginTypes from '../constants/LoginTypes';
import actionTypes from '../constants/ActionTypes';

const initialState = {
  errorMsg: '',
};

export default function signup(state = initialState, action) {
  switch (action.type) {
    case loginTypes.ERRORMSG:
      return assign({}, state, { errorMsg: action.errorMsg });
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
}
