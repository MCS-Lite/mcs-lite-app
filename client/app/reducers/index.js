import { combineReducers } from 'redux';
import prototypes from './prototypes';
import main from './main';
import login from './login';

const mcsLiteApp = combineReducers({
  main,
  prototypes,
  login,
})

export default mcsLiteApp