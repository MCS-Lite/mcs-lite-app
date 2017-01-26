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