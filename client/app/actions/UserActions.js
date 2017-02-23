import types from '../constants/userTypes';
import { request } from '../utils/fetch';

export const editUserName = (userName) => (dispatch, getState) => {
  return request('/user', 'PUT', { userName }, getState().main.access_token)
  .then(function() {
    return dispatch({
      type: types.EDITUSERNAMESUCCESS,
      userName: userName,
    });
  });
}
