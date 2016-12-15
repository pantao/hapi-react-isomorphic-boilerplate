export default (components, getState, dispatch, location, params, deferred) => {
  const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

  return components
    .filter((component) => component && component[methodName])
    .map((component) => component[methodName])
    .map(fetchData => fetchData(getState, dispatch, location, params));
};
