const loggerMiddleware = store => next => action => {
  const result = next(action);

  if (__SERVER__) {
    return result;
  }

  if (typeof( console.group ) === 'function') {
    console.group('action.type');
  }
  console.log('next state', store.getState());

  if (typeof( console.groupEnd ) === 'function') {
    console.groupEnd('action.type');
  }

  return result;
};

export default loggerMiddleware;
