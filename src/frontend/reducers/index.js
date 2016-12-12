import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userAgent from './userAgent';
import testing from './testing';

const rootReducer = combineReducers({
  userAgent,
  testing,
  routing: routerReducer
});

export default rootReducer;
