import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userAgent from './userAgent';
import testing from './testing';
import session from './session';

const rootReducer = combineReducers({
  userAgent,
  testing,
  session,
  routing: routerReducer
});

export default rootReducer;
