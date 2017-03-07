import assign from 'object-assign';
import dashboardActionTypes from '../constants/DashboardActionTypes';
import actionTypes from '../constants/ActionTypes';

const initialState = {
  templates: [],
  userPrototypes: {},
};

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case dashboardActionTypes.RETRIEVEDASHBOARD:
      return assign(
        {}, state,
        { templates: action.data.templates, userPrototypes: action.data.userPrototypes },
      );
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
}
