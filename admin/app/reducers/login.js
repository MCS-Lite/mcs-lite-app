import assign from 'object-assign';
import loginTypes from '../constants/loginTypes';
import actionTypes from '../constants/actionTypes';

const initialState = {
  errorMsg: '',
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case loginTypes.ERRORMSG:
      return assign({}, state, { errorMsg: action.errorMsg });
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
}
