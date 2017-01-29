import types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import { requestOauth } from '../utils/fetch';

export const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export const checkToken =  () => (dispatch) => {
  const token = getCookie('token');
  console.log(token);
  if (!token) {
    return browserHistory.push('/login')
  }
  console.log(4444);
  return requestOauth('/cookies', 'POST', { token: token })
  .then((data) => {
    return dispatch({
      type: types.CHECKTOKEN,
      access_token: data.results.access_token,
      token: data.results.token,
      userId: data.results.userId,
    });
  })
  .catch(error => {
    return browserHistory.push('/login?errorMsg=' + error);
  });
}