import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import userAgent from './userAgent';
import testing from './testing';
import session from './session';

const rootReducer = combineReducers({
  userAgent,
  testing,
  session,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
