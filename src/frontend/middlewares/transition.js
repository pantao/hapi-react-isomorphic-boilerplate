import Promise from 'bluebird';
import { LOCATION_CHANGE } from 'react-router-redux';
import getDataDependencies from '../helpers/getDataDependencies';

const locationsAreEqual = ( locA, locB ) => ( locA.pathname === locB.pathname ) && ( locA.search === locB.search );

export default ({ dispatch, getState }) => next => action => {
  console.log('action: ', action);
  if (action.type === LOCATION_CHANGE) {

    return next(action);

    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }

    const { components, location, params } = action.payload;
    const promise = new Promise(( resolve ) => {
      const doTransition = () => {
        next(action);
        Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
          .then(resolve)
          .catch(error => {
            // TODO: You may want to handle errors for fetchDataDeferred here
            console.warn('Warning: Error in fetchDataDeferred', error);

            return resolve();
          });
      };

      Promise.all(getDataDependencies(components, getState, dispatch, location, params))
        .then(doTransition)
        .catch(error => {
          // TODO: You may want to handle errors for fetchData here
          console.warn('Warning: Error in fetchData', error);

          return doTransition();
        });
    });

    if ( __SERVER__ ) {
      // router state is null until ReduxRouter is created so we can use this to store
      // our promise to let the server know when it can render
      getState().router = promise;
    }

    return promise;
  }

  return next(action);
};
