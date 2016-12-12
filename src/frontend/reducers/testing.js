import {
  TESTING,
  TESTING_SUCCEED,
  TESTING_FAILD,
  TESTING_PROXY,
  TESTING_PROXY_SUCCEED,
  TESTING_PROXY_FAILD
} from '../actions/testing';

const initialState = {

};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TESTING:
      return {
        ...state,
        ...action
      }
      break;
    case TESTING_SUCCEED:
      return {
        ...state,
        ...action
      }
      break;
    case TESTING_FAILD:
      return {
        ...state,
        ...action
      }
      break
    case TESTING_PROXY:
      return {
        ...state,
        ...action
      }
      break;
    case TESTING_PROXY_SUCCEED:
      return {
        ...state,
        proxyData: action.data
      }
      break;
    case TESTING_PROXY_FAILD:
      return {
        ...state,
        ...action
      }
      break
    default:
      return state;
  }
}

export default reducer;
