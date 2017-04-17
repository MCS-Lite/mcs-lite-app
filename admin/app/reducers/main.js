import assign from 'object-assign';
import { isEmpty, isNil } from 'ramda';
import actionTypes from '../constants/ActionTypes';

const initialState = {
  userId: '',
  access_token: '',
  token: '',
  isInitialized: false,
};

export default function main(state = initialState, action) {
  return state;
}

