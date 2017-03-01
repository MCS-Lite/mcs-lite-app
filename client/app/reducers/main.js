import actionTypes from '../constants/ActionTypes';
import userTypes from '../constants/userTypes';
import assign from 'object-assign';

const initialState = {
  userId: '',
  access_token: '',
  token: '',
  isInitialized: false,
};

export default function main( state = initialState, action ) {
  switch ( action.type ) {
    case actionTypes.CHECKTOKEN:
      return assign({}, state, {
        userId: action.userId,
        userName: action.userName,
        isAdmin: action.isAdmin,
        userImage: action.userImage || '',
        email: action.email,
        access_token: action.access_token,
        token: action.token,
        isInitialized: true,
      });
    case userTypes.EDITUSERNAMESUCCESS:
      return assign({}, state, {
        userName: action.userName,
      });
    default:
      return state;
  }
}
