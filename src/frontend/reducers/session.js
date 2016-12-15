import {
  SIGN_IN,
  SIGN_IN_SUCCEED,
  SIGN_IN_FAILD,
  LOAD_ME,
  LOAD_ME_SUCCEED,
  LOAD_ME_FAILD
} from '../actions/session';

const initialState = {
  me: {
    error: undefined,
    loading: false,
    loaded: false
  },
  signin: {
    error: undefined,
    loading: false,
    loaded: false
  },
  signup: {
    error: undefined,
    loading: false,
    loaded: false
  },
  signout: {
    error: undefined,
    loading: false,
    loaded: false
  }
};

const session = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ME:
      return {
        ...state,
        me: {
          loading: true,
          loaded: false,
          error: false
        }
      }
      break;
    case LOAD_ME_SUCCEED:
      return {
        ...state,
        me: {
          ...action.data,
          loading: false,
          loaded: true,
          error: false
        }
      }
      break;
    case LOAD_ME_FAILD:
      return {
        ...state,
        me: {
          error: action.error,
          loading: false,
          loaded: false
        }
      }
      break
    case SIGN_IN:
      return {
        ...state,
        signin: {
          loading: true,
          loaded: false,
          error: false
        }
      }
      break;
    case SIGN_IN_SUCCEED:
      return {
        ...state,
        me: {
          ...action.data,
          loading: false,
          loaded: true,
          error: false
        },
        signin: {
          loaded: true,
          loading: false,
          error: false
        }
      }
      break;
    case SIGN_IN_FAILD:
      return {
        ...state,
        signin: {
          error: action.error,
          loading: false,
          loaded: false
        }
      }
      break
    default:
      return state;
  }
}

export default session;
