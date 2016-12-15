import Promise from 'bluebird';
import { LOCATION_CHANGE } from 'react-router-redux';
import getDataDependencies from '../helpers/getDataDependencies';

const locationsAreEqual = ( locA, locB ) => ( locA.pathname === locB.pathname ) && ( locA.search === locB.search );

export default ({ dispatch, getState }) => next => action => {
  console.log('action: ', action);
  return next(action);
};
