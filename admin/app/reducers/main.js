import assign from 'object-assign';
import { isEmpty, isNil } from 'ramda';
import actionTypes from '../constants/actionTypes';
import userTypes from '../constants/userTypes';

const initialState = {
  userId: '',
  access_token: '',
  token: '',
  isInitialized: false,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHECKTOKEN:
      return assign({}, state, {
        userId: action.userId,
        userName: action.userName,
        isAdmin: action.isAdmin,
        userImage: (isNil(action.userImage) || isEmpty(action.userImage))
          ? undefined
          : window.apiUrl.replace('api', 'images/') + action.userImage,
        email: action.email,
        access_token: action.access_token,
        token: action.token,
        isInitialized: true,
      });
    case userTypes.EDITUSERNAMESUCCESS:
      return assign({}, state, {
        userName: action.userName,
      });
    case userTypes.UPLOADPROFILEIMAGE:
      return assign({}, state, {
        userImage: action.data
          ? window.apiUrl.replace('api', 'images/') + action.data
          : '',
      });
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
}
