import types from '../constants/DeviceActionTypes';
import { request } from '../utils/fetch';

export const retrieveDeviceList =  () => (dispatch, getState) => {
  return request('/devices', 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEDEVICELIST,
      data: data.data,
    });
  });
}

export const editDevice = (id, data) => (dispatch, getState) => {
  return request('/devices/' + id, 'PUT', data, getState().main.access_token)
  .then(function() {
    retrieveDeviceList()(dispatch, getState);
  });
}

export const deleteDevice =  (id) => (dispatch, getState) => {
  return request('/devices/' + id, 'DELETE', {}, getState().main.access_token)
  .then(function() {
    retrieveDeviceList()(dispatch, getState);
  });
}
