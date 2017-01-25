import types from '../constants/PrototypeActionTypes';
import { request } from '../utils/fetch';

export const retrievePrototypeList =  () => (dispatch, getState) => {
  console.log(getState().main.access_token)
  return request('/prototypes', 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEPROTOTYPELIST,
      data: data.data,
    });
  });
}

export const createNewPrototype =  () => (dispatch) => {
  return {};
}

export function editPrototype(status:Boolean) {
  // if (status) {
  //   return {
  //     type: types.OPEN_EDITPROTOTYPE,
  //   };
  // } else {
  //   return {
  //     type: types.CLOSE_EDITPROTOTYPE,
  //   };
  // }
  return {};
}

export const clonePrototype =  () => (dispatch) => {
  return {};
}

export const deletePrototype =  () => (dispatch) => {
  return {};
}
