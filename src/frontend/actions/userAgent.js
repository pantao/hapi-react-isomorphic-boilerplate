export const SET_USER_AGENT = 'SET_USER_AGENT';

export const setUserAgent = userAgent => {
  return {
    type: SET_USER_AGENT,
    userAgent
  };
};
