import types from '../constants/DeviceActionTypes';
import { request } from '../utils/fetch';

export const retrieveDeviceList =  () => (dispatch, getState) => {
  console.log(getState().main.access_token)
  return request('/devices', 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEDEVICELIST,
      data: data.data,
    });
  });
}
