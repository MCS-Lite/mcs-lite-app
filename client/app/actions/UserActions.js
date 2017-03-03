import types from '../constants/userTypes';
import { request } from '../utils/fetch';

export const editUserName = userName => (dispatch, getState) =>
  request('/user', 'PUT', { userName }, getState().main.access_token)
    .then(() => dispatch({
      type: types.EDITUSERNAMESUCCESS,
      userName,
    }));

export const changePassword = password => (dispatch, getState) =>
  request('/users/changepassword', 'PUT', { password }, getState().main.access_token)
    .then(() => dispatch({
      type: types.CHANGEPASSWORDSUCCESS,
    }))
    .catch(() => Promise.reject());
