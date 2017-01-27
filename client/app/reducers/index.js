import { combineReducers } from 'redux';
import prototypes from './prototypes';
import main from './main';
import devices from './devices';
import login from './login';


const mcsLiteApp = combineReducers({
  main,
  prototypes,
  login,
  devices,
})

export default mcsLiteApp