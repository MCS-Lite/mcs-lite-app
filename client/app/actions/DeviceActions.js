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
