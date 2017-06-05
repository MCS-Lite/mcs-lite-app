import types from '../constants/prototypeActionTypes';
import { request } from '../utils/fetch';

export const retrievePrototypeList = () => (dispatch, getState) =>
  request('/prototypes', 'GET', getState().main.access_token)
    .then(data => dispatch({
      type: types.RETRIEVEPROTOTYPELIST,
      data: data.data,
    }));

export const createNewPrototype = data => (dispatch, getState) =>
  request('/prototypes', 'POST', data, getState().main.access_token);

export const editPrototype = (id, data) => (dispatch, getState) =>
  request(`/prototypes/${id}`, 'PUT', data, getState().main.access_token)
    .then(() => {
      retrievePrototypeList()(dispatch, getState);
    });

export const clonePrototype = (id, data) => (dispatch, getState) =>
  request(`/prototypes/${id}/clone`, 'POST', data, getState().main.access_token);

export const deletePrototype = id => (dispatch, getState) =>
  request(`/prototypes/${id}`, 'DELETE', {}, getState().main.access_token)
    .then(() => {
      retrievePrototypeList()(dispatch, getState);
    });

export const retrievePrototypeTemplates = () => (dispatch, getState) =>
  request('/prototypes/templates', 'GET', getState().main.access_token)
    .then(data => dispatch({
      type: types.RETRIEVEPROTOTYPETEMPLATES,
      data: data.data,
    }));

export const uploadPrototypeImage = file => (dispatch, getState) =>
  request('/upload/image?type=prototype', 'POST_FORM_DATA', file, getState().main.access_token)
  .catch(() => Promise.reject());

export const exportJSON = id => (dispatch, getState) =>
  request(`/prototypes/${id}/export`, 'POST', {}, getState().main.access_token);

export const importJSON = (id, json) => (dispatch, getState) =>
  request(`/prototypes/${id}/import`, 'POST', { content: json }, getState().main.access_token)
  .catch(e => Promise.reject(e));
