import types from '../constants/deviceActionTypes';
import { request } from '../utils/fetch';

export const retrieveDeviceList = () => (dispatch, getState) =>
  request('/devices', 'GET', getState().main.access_token)
    .then(data => dispatch({
      type: types.RETRIEVEDEVICELIST,
      data: data.data,
    }));

export const editDevice = (id, data) => (dispatch, getState) =>
  request(`/devices/${id}`, 'PUT', data, getState().main.access_token)
    .then(() => {
      retrieveDeviceList()(dispatch, getState);
    });

export const deleteDevice = id => (dispatch, getState) =>
  request(`/devices/${id}`, 'DELETE', {}, getState().main.access_token)
    .then(() => {
      retrieveDeviceList()(dispatch, getState);
    });

export const uploadDeviceImage = file => (dispatch, getState) =>
  request('/upload/image?type=device', 'POST_FORM_DATA', file, getState().main.access_token)
  .catch(() => Promise.reject());
