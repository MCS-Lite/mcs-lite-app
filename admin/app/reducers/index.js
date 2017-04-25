import { combineReducers } from 'redux';
import main from './main';
import login from './login';

const mcsLiteApp = combineReducers({
  main,
  login,
});

export default mcsLiteApp;
