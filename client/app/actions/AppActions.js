import types from '../constants/ActionTypes';
import { createFetch } from 'http-client';

const fetch = createFetch(
  base(window.apiUrl),  // Prefix all request URLs
  accept('application/json'),         // Set "Accept: application/json" in the request headers
  parse('json')                       // Read the response as JSON and put it in response.body
);

const getCookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export const checkToken =  () => (dispatch) => {
  fetch('/oauth/token')
  .then(response => {
    getCookie('token')
  });
}