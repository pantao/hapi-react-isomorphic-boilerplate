import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';
import Fetcher from './helpers/fetcher';
import getRoutes from './routes';
import configureStore from './store/configureStore';

// 浏览器端使用 browserHistory
const history = createHistory();
// 从 window.__INITIAL_STATE__ 变量中获取初始 state
const initialState = window.__INITIAL_STATE__;
// 将 fetcher 注入到 redux fetchMiddleware 之后，即可以在 Action 中直接使用 Fetch
const fetcher = new Fetcher();
// 创建 store
const store = configureStore(
  history, fetcher, initialState
);

const root = document.getElementById('root');

// 若是开发环境，将 React 注入到 window 对象中，同时，若没有  root 元素
// 直接报错
if ( __DEVELOPMENT__ ) {
  window.React = React;

  if (!root || !root.firstChild || !root.firstChild.attributes || !root.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

// 运行
const run = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={ getRoutes(store) } history={ history } />
    </Provider>,
    root
  );
};

// boot 方法，启动应用
const boot = () => {
  if ( window.addEventListener ) {
    window.addEventListener( 'DOMContentLoaded', run);
  } else {
    window.attachEvent( 'onload', run);
  }
}

boot();
