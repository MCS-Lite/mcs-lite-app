import types from '../constants/PrototypeActionTypes';

export function editPrototype( status:Boolean) {
  if (status) {
    return {
      type: types.OPEN_EDITPROTOTYPE,
    };
  } else {
    return {
      type: types.CLOSE_EDITPROTOTYPE,
    };
  }
}


export function submitEditPrototype( data:Object) {

}