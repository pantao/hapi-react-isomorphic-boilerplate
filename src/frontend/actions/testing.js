export const TESTING = 'TESTING';
export const TESTING_SUCCEED = 'TESTING_SUCCEED';
export const TESTING_FAILD = 'TESTING_FAILD';

export const TESTING_PROXY = 'TESTING_PROXY';
export const TESTING_PROXY_SUCCEED = 'TESTING_PROXY_SUCCEED';
export const TESTING_PROXY_FAILD = 'TESTING_PROXY_FAILD';

export const testing = () => {
  return {
    type: TESTING,
    fetch: ( fetcher ) => fetcher.get('/api/testing')
  };
}

export const testingProxy = ( ) => {
  return {
    type: TESTING_PROXY,
    fetch: ( fetcher ) => fetcher.get('/proxy/testing/api/testing')
  };
}
