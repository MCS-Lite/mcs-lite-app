import types from '../constants/DeviceActionTypes';
import { request } from '../utils/fetch';
import { browserHistory } from 'react-router'

export const retrieveDevice =  (id) => (dispatch, getState) => {
  return request('/devices/' + id , 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEDEVICE,
      data: data.data,
    });
  });
}

export const editDevice = (id, data) => (dispatch, getState) => {
  return request('/devices/' + id, 'PUT', data, getState().main.access_token)
  .then(function() {
    retrieveDevice(id)(dispatch, getState);
  });
}

export const deleteDevice =  (id) => (dispatch, getState) => {
  return request('/devices/' + id, 'DELETE', {}, getState().main.access_token)
  .then(function() {
    browserHistory.push('/devices/');
    retrieveDeviceList()(dispatch, getState);
  });
}
