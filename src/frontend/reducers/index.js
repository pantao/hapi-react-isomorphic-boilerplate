import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userAgent from './userAgent';

const rootReducer = combineReducers({
  userAgent,
  routing: routerReducer
});

export default rootReducer;
