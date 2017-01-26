import types from '../constants/PrototypeActionTypes';
import { request } from '../utils/fetch';

export const retrievePrototype =  (id) => (dispatch, getState) => {
  return request('/prototypes/' + id, 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEPROTOTYPE,
      data: data.data,
    });
  });
}

export const createTestDevice =  (data) => (dispatch, getState) => {
  data.createUserId = getState().main.userId;
  return request('/devices', 'POST', data, getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.CREATETESTDEVICE,
      data: data.data,
    });
  });
}

export const editPrototype = (id) => (dispatch, getState) => {
  return request('/prototypes/' + id + '/', 'POST', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.CREATETESTDEVICE,
      data: data.data,
    });
  });
}