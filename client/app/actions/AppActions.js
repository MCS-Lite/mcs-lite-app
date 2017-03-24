import { browserHistory } from 'react-router';
import cookieDough from 'cookie-dough';
import types from '../constants/ActionTypes';
import { requestOauth } from '../utils/fetch';

const cookie = cookieDough();

export const checkToken = () =>
  dispatch => {
    const token = cookie.get('token');
    if (!token) {
      return browserHistory.push('/login');
    }
    return requestOauth('/cookies', 'POST', { token })
      .then(data =>
        dispatch({
          type: types.CHECKTOKEN,
          access_token: data.results.access_token,
          token: data.results.token,
          userId: data.results.userId,
          userName: data.results.userName,
          email: data.results.email,
          userImage: data.results.userImage,
          isAdmin: data.results.isAdmin,
        }))
      .catch(error => browserHistory.push(`/login?errorMsg=${error}`));
  };

export const signOut = () =>
  dispatch => {
    cookie.remove('token');
    return dispatch({ type: types.SIGNOUT });
  };
