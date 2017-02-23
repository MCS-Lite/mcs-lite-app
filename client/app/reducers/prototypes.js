import {
  RETRIEVEPROTOTYPE,
  RETRIEVEPROTOTYPELIST,
  RETRIEVEPROTOTYPETEMPLATES,
} from '../constants/PrototypeActionTypes';
import assign from 'object-assign';

const initialState = {
  prototypeList: [],
  prototypeDetail: {},
};

export default function prototypes( state = initialState, action ) {
  switch ( action.type ) {
    case RETRIEVEPROTOTYPE:
      return assign({}, state, { prototypeDetail: action.data });
    case RETRIEVEPROTOTYPELIST:
      return assign({}, state, { prototypeList: action.data });
    case RETRIEVEPROTOTYPETEMPLATES:
      return assign({}, state, { prototypeTemplates: action.data });
    default:
      return state;
  }
}
