import Promise from 'bluebird';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCEED = 'SIGN_UP_SUCCEED';
export const SIGN_UP_FAILD = 'SIGN_UP_FAILD';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCEED = 'SIGN_IN_SUCCEED';
export const SIGN_IN_FAILD = 'SIGN_IN_FAILD';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_SUCCEED = 'SIGN_OUT_SUCCEED';
export const SIGN_OUT_FAILD = 'SIGN_OUT_FAILD';
export const LOAD_ME = 'LOAD_ME';
export const LOAD_ME_SUCCEED = 'LOAD_ME_SUCCEED';
export const LOAD_ME_FAILD = 'LOAD_ME_FAILD';

export const loadCurrentUser = ( ) => {
  return {
    type: LOAD_ME,
    fetch: fetcher => fetcher.get('/api/me')
  };
}

export const signIn = credentials => {
  return {
    type: SIGN_IN,
    fetch: fetcher => fetcher.post('/api/sign/in', { data: credentials})
  }
};
