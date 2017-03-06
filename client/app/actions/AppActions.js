import { browserHistory } from 'react-router';
import cookieDough from 'cookie-dough'
import types from '../constants/ActionTypes';
import { requestOauth } from '../utils/fetch';

const cookie = cookieDough();

export const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export const checkToken =  () => (dispatch) => {
  const token = getCookie('token');
  if (!token) {
    return browserHistory.push('/login')
  }
  return requestOauth('/cookies', 'POST', { token: token })
  .then((data) => {
    return dispatch({
      type: types.CHECKTOKEN,
      access_token: data.results.access_token,
      token: data.results.token,
      userId: data.results.userId,
      userName: data.results.userName,
      email: data.results.email,
      userImage: data.results.userImage,
      isAdmin: data.results.isAdmin,
    });
  })
  .catch(error => {
    return browserHistory.push('/login?errorMsg=' + error);
  });
}

export const signOut = () => (dispatch) => {
  cookie.remove('token');

  return dispatch({ type: types.SIGNOUT });
};
