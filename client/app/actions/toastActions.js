import types from '../constants/toastActionTypes';

export const pushToast = ({ kind, message }) => dispatch => dispatch({
  type: types.PUSHTOAST,
  payload: { kind, message },
});

export const dropToast = () => dispatch => dispatch({
  type: types.DROPTOAST,
});
