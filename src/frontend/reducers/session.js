import {
  SIGN_IN,
  SIGN_IN_SUCCEED,
  SIGN_IN_FAILD,
  LOAD_ME,
  LOAD_ME_SUCCEED,
  LOAD_ME_FAILD
} from '../actions/session';

const initialState = {
  token: '',
  credentials: undefined,
  me: undefined,
  loading: false,
  error: undefined
};

const session = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ME:
      return {
        ...state,
        ...action
      }
      break;
    case LOAD_ME_SUCCEED:
      return {
        ...state,
        ...action.data,
        error: null
      }
      break;
    case LOAD_ME_FAILD:
      return {
        ...state,
        ...action
      }
      break
    case SIGN_IN:
      return {
        ...state,
        ...action,
        error: null
      }
      break;
    case SIGN_IN_SUCCEED:
      return {
        ...state,
        ...action.data,
        error: null
      }
      break;
    case SIGN_IN_FAILD:
      return {
        ...state,
        ...action
      }
      break
    default:
      return state;
  }
}

export default session;
