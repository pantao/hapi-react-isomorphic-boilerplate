import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import qs from 'query-string';

import configureStore from './store/configureStore';
import getRoutes from './routes';
import {setUserAgent} from './actions/userAgent';
import {loadCurrentUser} from './actions/session';
import Html from './html';

import Fetcher from './helpers/fetcher';

/**
 * 前端模块
 *
 * 当服务器注册该模块后，会提供前端项目的服务器端渲染功能
 *
 * @param  {Hapi.server}    server  Hapi.Server 对象
 * @param  {Object}         options 配置选项
 * @param  {Function}       next    当注册完成之后，需要调用的回掉方法，以继续其它操作
 * @return {mixed}                  多类型返回值
 */
const register = (server, options, next) => {

  server.ext('onPreResponse', (request, reply) => {

    // 若前请求的响应已经被初始化，则表示当前请求是符合 Hapi 服务器端其它路径定义的，直接继续
    if (typeof request.response.statusCode !== 'undefined') {
      return reply.continue();
    }

    const location = request.path;

    const history = createHistory();
    const fetcher = new Fetcher(request);
    const store = configureStore(history, fetcher, {});
    const routes = getRoutes(store);

    const bydrateOnClient = () => {
      reply(`<!doctype html>${renderToString(<Html store={store}/>)}`).code(500);
    }

    match({
      routes,
      location
    }, (err, redirectLocation, renderProps) => {
      if (redirectLocation) {
        reply.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (err) {
        bydrateOnClient();
      } else if (renderProps) {
        if (renderProps.location.search && !renderProps.location.query) {
          renderProps.location.query = qs.parse(renderProps.location.search);
        }

        const promises = renderProps.components.filter(com => typeof com.fetchData === 'function').map(com => com.fetchData).map(fetchData => fetchData(store.getState, store.dispatch));
        // 设置 UserAgent
        const userAgent = {
          name: request.headers['user-agent']
        };

        promises.push(store.dispatch(setUserAgent(userAgent)));
        promises.push(store.dispatch(loadCurrentUser()));

        Promise.all(promises).then(() => {

          const component = (
            <Provider store={store} history={history} key="provider">
              <RouterContext { ...renderProps }/>
            </Provider>
          );

          reply(`<!doctype html>${renderToString(<Html component={component}/>)}`);
        });
      } else {
        reply.continue();
      }
    });
  });

  return next();
};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'frontend',
  version: '0.0.0'
};

export default register;
