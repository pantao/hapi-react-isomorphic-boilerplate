import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import Serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

const scripts = [];

if (!__DEVELOPMENT__) {
  const webpackConfig = require('../webpack/production.config');
  const stats = require('../../public/assets/webpack.stats.json');
  const assets = stats.assetsByChunkName;
  for (let key of Object.keys(assets)) {
    let asset = assets[key];
    if (asset.endsWith('.js')) {
      scripts.push(webpackConfig.output.publicPath + asset);
    }
  }
} else {
  const webpackConfig = require('../webpack/development.config');
  scripts.push(webpackConfig.output.publicPath + 'bundle.js');
}

export default class Html extends Component {
  static propTypes : {
    component: PropTypes.node,
    store: PropTypes.object,
    initialState: PropTypes.object
  }

  render() {
    const {component, store} = this.props;
    let componentHTML = '';
    let head = '';
    let base = '';
    let title = '';
    let meta = '';
    let link = '';
    let script = '';

    if (typeof component !== 'undefined') {
      componentHTML = renderToString(component);
      head = Helmet.rewind();
    }

    if (head) {
      base = head.base.toComponent();
      title = head.title.toComponent();
      meta = head.meta.toComponent();
      link = head.link.toComponent();
      script = head.script.toComponent();
    }

    const initialState = store.getState();

    let _html = `window.__INITIAL_STATE__ = ${Serialize(initialState)};`;
    _html += `window.__HELMET__ = ${Serialize(__HELMET__)};`;
    _html += `window.__DEVELOPMENT__ = ${Serialize(__DEVELOPMENT__)};`;
    _html += `window.__TESTING__ = ${Serialize(__TESTING__)};`;
    _html += `window.__SERVER__ = ${Serialize(false)};`;
    _html += `window.__PRODUCTION__ = ${Serialize(__PRODUCTION__)};`;
    return (
      <html lang="zh-CN">
        <head>
          {base}{title}{meta}{link}{script}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{
            __html: componentHTML
          }}/>
          <script dangerouslySetInnerHTML={{
            __html: _html
          }} charSet="UTF-8"/> {scripts.map((src, i) => <script src={src} key={i}/>)}
        </body>
      </html>
    );
  }
}
