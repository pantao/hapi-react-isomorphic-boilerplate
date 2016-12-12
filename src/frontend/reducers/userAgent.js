import {
  SET_USER_AGENT
} from '../actions/userAgent';

const initialState = {

}

const userAgent = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_AGENT:
      const ua = action.userAgent;
      return {
        ...state,
        ...ua
      }
      break;
    default:
      return state;
  }
}

export default userAgent;
