import types from '../constants/dashboardActionTypes';
import { request } from '../utils/fetch';

export const retrieveDashboard =  () => (dispatch, getState) => {
  return request('/dashboard', 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEDASHBOARD,
      data: data.data,
    });
  });
}
