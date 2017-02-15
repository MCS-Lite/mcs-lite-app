import types from '../constants/PrototypeActionTypes';
import { request } from '../utils/fetch';
import { browserHistory } from 'react-router';


export const retrievePrototypeList =  () => (dispatch, getState) => {
  return request('/prototypes', 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEPROTOTYPELIST,
      data: data.data,
    });
  });
}

export const createNewPrototype =  (data) => (dispatch, getState) => {
  return request('/prototypes', 'POST', data, getState().main.access_token)
  .then((data) => {
    retrievePrototypeList()(dispatch, getState);
  });
}

export const editPrototype = (id, data) => (dispatch, getState) => {
  return request('/prototypes/' + id, 'PUT', data, getState().main.access_token)
  .then(function() {
    retrievePrototypeList()(dispatch, getState);
  });
}

export const clonePrototype =  (id, data) => (dispatch, getState) => {
  return request('/prototypes/' + id + '/clone', 'POST', data, getState().main.access_token)
  .then(function() {
    retrievePrototypeList()(dispatch, getState);
  });
}

export const deletePrototype =  (id) => (dispatch, getState) => {
  return request('/prototypes/' + id, 'DELETE', {}, getState().main.access_token)
  .then(function() {
    retrievePrototypeList()(dispatch, getState);
  });
}
