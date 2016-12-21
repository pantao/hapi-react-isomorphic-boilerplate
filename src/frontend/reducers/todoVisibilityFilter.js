import {
  VisibilityFilters,
  SET_VISIBILITY_FILTER
} from '../actions/todo';

const {
  SHOW_ALL
} = VisibilityFilters

const reducer = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default reducer;
