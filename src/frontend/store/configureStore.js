import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducers from '../reducers';
import loggerMiddleware from '../middlewares/logger';
import fetcherMiddleware from '../middlewares/fetcher';

const configureStore = ( history, fetcher, initialState ) => {
  let finalCreateStore;

  const middlewares = [
    routerMiddleware(history),
    fetcherMiddleware(fetcher)
  ];

  if ( __DEVELOPMENT__ ) {
    middlewares.push(loggerMiddleware);
  }

  finalCreateStore = applyMiddleware( ...middlewares )(createStore);

  const store = finalCreateStore( rootReducers , initialState );

  if ( __DEVELOPMENT__ && module.hot ) {
    // 为 reducers 启用 webpack 模块热加载功能
    module.hot.accept('../reducers', () => {
      store.replaceReducer( require('../reducers') );
    });
  }

  return store;
}

export default configureStore;
