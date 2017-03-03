import { drop, append } from 'ramda';
import toastActionTypes from '../constants/toastActionTypes';

const initialState = {
  toastList: [],
};

export default function menus(state = initialState, action) {
  switch (action.type) {
    case toastActionTypes.PUSHTOAST:
      return { toastList: append(action.payload, state.toastList) };
    case toastActionTypes.DROPTOAST:
      return { toastList: drop(1, state.toastList) };
    default:
      return state;
  }
}
