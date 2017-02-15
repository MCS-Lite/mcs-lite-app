import { combineReducers } from 'redux';
import prototypes from './prototypes';
import main from './main';
import devices from './devices';
import login from './login';
import signin from './signin';
import dashboard from './dashboard';

const mcsLiteApp = combineReducers({
  main,
  prototypes,
  login,
  devices,
  signin,
  dashboard,
})

export default mcsLiteApp