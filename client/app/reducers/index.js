import { combineReducers } from 'redux';
import prototypes from './prototypes';
import main from './main';
import devices from './devices';
import login from './login';
import signin from './signin';

const mcsLiteApp = combineReducers({
  main,
  prototypes,
  login,
  devices,
  signin,
})

export default mcsLiteApp