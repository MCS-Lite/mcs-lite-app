import assign from 'object-assign';
import { assocPath } from 'ramda';
import actionTypes from '../constants/ActionTypes';
import deviceActionTypes from '../constants/DeviceActionTypes';

const initialState = {
  deviceList: [],
  datachannelDatapoints: {},
  deviceDetail: {},
};

export default function menus(state = initialState, action) {
  switch (action.type) {
    case deviceActionTypes.RETRIEVEDEVICE:
      return assign({}, state, { deviceDetail: action.data });
    case deviceActionTypes.RETRIEVEDEVICELIST:
      return assign({}, state, { deviceList: action.data });
    case deviceActionTypes.RETRIVEDATACHANNELDATAPOINT:
      return assocPath(
        ['datachannelDatapoints', action.deviceId, action.datachannelId],
        action.data,
        state
      );
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
}
