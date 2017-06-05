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

export const uploadProfileImage = file => (dispatch, getState) =>
  request('/upload/image?type=profile', 'POST_FORM_DATA', file, getState().main.access_token)
  .then(({ data }) => dispatch({
    type: types.UPLOADPROFILEIMAGE,
    data,
  }))
  .catch(() => Promise.reject());
