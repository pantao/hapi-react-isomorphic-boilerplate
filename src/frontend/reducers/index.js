import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import userAgent from './userAgent';
import testing from './testing';
import session from './session';
import todo from './todo';
import todoVisibilityFilter from './todoVisibilityFilter';

const rootReducer = combineReducers({
  userAgent,
  testing,
  session,
  todo, todoVisibilityFilter,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
