import types from '../constants/ActionTypes';
import { createFetch, base, accept, method, body, parse } from 'http-client';
import { browserHistory } from 'react-router';

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export const checkToken =  () => (dispatch) => {
  const token = getCookie('token');

  if (!token) {
    return browserHistory.push('/login')
  }

  const fetch = createFetch(
    base('http://127.0.0.1:3000'),
    accept('application/json'),
    method('POST'),
    body(JSON.stringify({ token: token }), 'application/json'),
    parse('json'),
  );

  fetch('/auth/cookies')
  .then(response => {
    console.log(response);
    // return dispatch({
    //   token
    // })
  });
}