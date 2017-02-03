import types from '../constants/PrototypeActionTypes';
import { request } from '../utils/fetch';
import { browserHistory } from 'react-router';

export const retrievePrototype =  (id) => (dispatch, getState) => {
  return request('/prototypes/' + id, 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEPROTOTYPE,
      data: data.data,
    });
  });
}

export const createTestDevice =  (data) => (dispatch, getState) => {
  data.createUserId = getState().main.userId;
  return request('/devices', 'POST', data, getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.CREATETESTDEVICE,
      data: data.data,
    });
  });
}

export const editPrototype = (id, data) => (dispatch, getState) => {
  return request('/prototypes/' + id, 'PUT', data, getState().main.access_token)
  .then(function() {
    retrievePrototype(id)(dispatch, getState);
  });
}

export const clonePrototype =  (id, data) => (dispatch, getState) => {
  return request('/prototypes/' + id + '/clone', 'POST', data, getState().main.access_token)
  .then(function(data) {
    browserHistory.push('/prototypes/' + data.data.prototypeId);
  });
}

export const deletePrototype =  (id) => (dispatch, getState) => {
  return request('/prototypes/' + id, 'DELETE', {}, getState().main.access_token)
  .then(function() {
    browserHistory.push('/prototypes');
  });
}

export const createDataChannel = (id, data) => (dispatch, getState) => {
  return request('/prototypes/' + id + '/datachannels', 'POST', data, getState().main.access_token)
  .then(function() {
    return request('/prototypes/' + id, 'GET', getState().main.access_token)
  })
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEPROTOTYPE,
      data: data.data,
    });
  });
}