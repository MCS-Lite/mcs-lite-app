import types from '../constants/DeviceActionTypes';
import { request } from '../utils/fetch';

export const retrieveDevice =  (id) => (dispatch, getState) => {
  return request('/devices/' + id , 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEDEVICE,
      data: data.data,
    });
  });
}
