import { browserHistory } from 'react-router';
import types from '../constants/deviceActionTypes';
import { retrieveDeviceList } from './deviceActions';
import { request } from '../utils/fetch';

export const retrieveDevice = id => (dispatch, getState) =>
  request(`/devices/${id}`, 'GET', getState().main.access_token)
    .then(data => dispatch({
      type: types.RETRIEVEDEVICE,
      data: data.data,
    }));

export const editDevice = (id, data) => (dispatch, getState) =>
  request(`/devices/${id}`, 'PUT', data, getState().main.access_token)
    .then(() => {
      retrieveDevice(id)(dispatch, getState);
    });

export const deleteDevice = id => (dispatch, getState) =>
  request(`/devices/${id}`, 'DELETE', {}, getState().main.access_token)
    .then(() => {
      browserHistory.push('/devices/');
      retrieveDeviceList()(dispatch, getState);
    });

export const retrieveDatachannelDatapoint =
  (deviceId, deviceKey, datachannelId, start, end) => (dispatch, getState) =>
    request(`/devices/${deviceId}/datachannels/${datachannelId}/datapoints?${start ? `start=${start}&` : ''}${end ? `end=${end}` : ''}`, 'GET_DATAPOINTS', deviceKey, getState().main.access_token)
      .then(data => dispatch({
        type: types.RETRIVEDATACHANNELDATAPOINT,
        data: data.data,
        deviceId,
        datachannelId,
      }));
