import prototypeActionTypes from '../constants/PrototypeActionTypes';
import assign from 'object-assign';

const initialState = {
  prototypeList: [],
  prototypeDetail: {},
};

export default function prototypes( state = initialState, action ) {
  switch ( action.type ) {
    case prototypeActionTypes.RETRIEVEPROTOTYPE:
      return assign({}, state, { prototypeDetail: action.data });
    case prototypeActionTypes.RETRIEVEPROTOTYPELIST:
      return assign({}, state, { prototypeList: action.data });
    case prototypeActionTypes.RETRIEVEPROTOTYPETEMPLATES:
      return assign({}, state, { prototypeTemplates: action.data });
    default:
      return state;
  }
}
