import { combineReducers } from 'redux';
import prototypes from './prototypes';
import main from './main';

const mcsLiteApp = combineReducers({
  main,
  prototypes,
})

export default mcsLiteApp