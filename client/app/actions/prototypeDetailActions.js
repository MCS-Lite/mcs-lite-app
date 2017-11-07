import { browserHistory } from 'react-router';
import types from '../constants/prototypeActionTypes';
import { request } from '../utils/fetch';

export const retrievePrototype = id => (dispatch, getState) =>
  request(`/prototypes/${id}`, 'GET', getState().main.access_token).then(data =>
    dispatch({
      type: types.RETRIEVEPROTOTYPE,
      data: data.data,
    }),
  );

export const createTestDevice = data => (dispatch, getState) =>
  request(
    '/devices',
    'POST',
    {
      ...data,
      createUserId: getState().main.userId,
    },
    getState().main.access_token,
  ).then(results => {
    browserHistory.push(`/devices/${results.data.deviceId}`);
  });

export const editPrototype = (id, data) => (dispatch, getState) =>
  request(
    `/prototypes/${id}`,
    'PUT',
    data,
    getState().main.access_token,
  ).then(() => {
    retrievePrototype(id)(dispatch, getState);
  });

export const clonePrototype = (id, data) => (dispatch, getState) =>
  request(
    `/prototypes/${id}/clone`,
    'POST',
    data,
    getState().main.access_token,
  ).then(results => {
    retrievePrototype(results.data.prototypeId)(dispatch, getState).then(() =>
      browserHistory.push(`/prototypes/${results.data.prototypeId}`),
    );
  });

export const deletePrototype = id => (dispatch, getState) =>
  request(
    `/prototypes/${id}`,
    'DELETE',
    {},
    getState().main.access_token,
  ).then(() => {
    browserHistory.push('/prototypes');
  });

export const checkDatachannelIdAvailable = (prototypeId, datachannelId) => (
  dispatch,
  getState,
) =>
  request(
    `/prototypes/${prototypeId}/datachannels/${datachannelId}/available`,
    'GET',
    getState().main.access_token,
  );

export const createDataChannel = (id, data) => (dispatch, getState) =>
  request(
    `/prototypes/${id}/datachannels`,
    'POST',
    data,
    getState().main.access_token,
  )
    .then(() =>
      request(`/prototypes/${id}`, 'GET', getState().main.access_token),
    )
    .then(results =>
      dispatch({
        type: types.RETRIEVEPROTOTYPE,
        data: results.data,
      }),
    );

export const editDataChannel = (id, dataChannelId, data) => (
  dispatch,
  getState,
) =>
  request(
    `/prototypes/${id}/datachannels/${dataChannelId}`,
    'PUT',
    data,
    getState().main.access_token,
  )
    .then(() =>
      request(`/prototypes/${id}`, 'GET', getState().main.access_token),
    )
    .then(results =>
      dispatch({
        type: types.RETRIEVEPROTOTYPE,
        data: results.data,
      }),
    );

export const deleteDataChannel = (id, dataChannelId) => (dispatch, getState) =>
  request(
    `/prototypes/${id}/datachannels/${dataChannelId}`,
    'DELETE',
    {},
    getState().main.access_token,
  )
    .then(() =>
      request(`/prototypes/${id}`, 'GET', getState().main.access_token),
    )
    .then(results =>
      dispatch({
        type: types.RETRIEVEPROTOTYPE,
        data: results.data,
      }),
    );

export const retrieveUnitTypes = () => (dispatch, getState) =>
  request('/unittypes', 'GET', getState().main.access_token).then(results =>
    dispatch({
      type: types.RETRIEVEUNITTYPES,
      data: results.data,
    }),
  );

export const createUnitTypes = ({ name, symbol }) => (dispatch, getState) =>
  request('/unittypes', 'POST', { name, symbol }, getState().main.access_token)
    .then(() => request('/unittypes', 'GET', getState().main.access_token))
    .then(results =>
      dispatch({
        type: types.RETRIEVEUNITTYPES,
        data: results.data,
      }),
    );

export const setPrototypeToTemplate = ({ status, prototypeId }) => (
  dispatch,
  getState,
) =>
  request(
    `/prototypes/${prototypeId}/templates`,
    'POST',
    { status },
    getState().main.access_token,
  ).then(() => Promise.resolve());
