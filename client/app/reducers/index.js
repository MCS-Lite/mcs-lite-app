import { combineReducers } from 'redux';
import prototypes from './prototypes';
import main from './main';
import devices from './devices';
import login from './login';
import signup from './signup';
import dashboard from './dashboard';
import toasts from './toasts';

const mcsLiteApp = combineReducers({
  main,
  prototypes,
  login,
  devices,
  signup,
  dashboard,
  toasts,
});

export default mcsLiteApp;
