import types from '../constants/PrototypeActionTypes';
import { request } from '../utils/fetch';
import { browserHistory } from 'react-router';

import { retrieveDashboard } from './DashboardActions';

export const retrievePrototypeList =  () => (dispatch, getState) => {
  return request('/prototypes', 'GET', getState().main.access_token)
  .then((data) => {
    return dispatch({
      type: types.RETRIEVEPROTOTYPELIST,
      data: data.data,
    });
  });
}

export const createNewPrototype =  (data, isDashboard) => (dispatch, getState) => {
  return request('/prototypes', 'POST', data, getState().main.access_token)
  .then((data) => {
    if(isDashboard) {
      retrieveDashboard()(dispatch, getState);
    } else {
      retrievePrototypeList()(dispatch, getState);
    }
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

export const retrievePrototypeTemplates =  () => (dispatch, getState) => {
  return request('/prototypes/templates', 'GET', getState().main.access_token)
  .then((data) => dispatch({
    type: types.RETRIEVEPROTOTYPETEMPLATES,
    data: data.data,
  }));
}
