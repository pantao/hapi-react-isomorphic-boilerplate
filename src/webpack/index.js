import Path from 'path';
import Webpack from 'webpack';
import _webpackDevMiddleware from 'webpack-dev-middleware';
import _webpackHotMiddleware from 'webpack-hot-middleware';

const registerDevelopmentOnly = server => {
  const compiler = require('webpack')(require('./development.config'));
  const assets = {
    // webpack-dev-middleware options
    // See https://github.com/webpack/webpack-dev-middleware
    publicPath: '/',
    contentBase: 'src',
    lazy: false,
    watchOptions: {
      // aggregateTimeout: 300,
      // poll: false,
      signal: true
    },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  };

  const hot = {
    // webpack-hot-middleware options
    // See https://github.com/glenjamin/webpack-hot-middleware
    timeout: '20000',
    reload: true
  };

  const webpackDevMiddleware = _webpackDevMiddleware(compiler, assets);
  const webpackHotMiddleware = _webpackHotMiddleware(compiler, hot);

  // Handle webpackDevMiddleware
  server.ext('onRequest', (request, reply) => {
    const {
      req,
      res
    } = request.raw;
    webpackDevMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      reply.continue();
    });
  });

  // Handle webpackHotMiddleware
  server.ext('onRequest', (request, reply) => {
    const {
      req,
      res
    } = request.raw;
    webpackHotMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      reply.continue();
    });
  });

  // Expose compiler
  server.expose({
    compiler
  });
}

/**
 * Webpack 模块
 *
 * 为开发环境提供 Webpack 服务，该服务支持代码的热更新与服务器端动态 bundle 功能
 *
 * @param  {Hapi.server}    server  Hapi.Server 对象
 * @param  {Object}         options 配置选项
 * @param  {Function}       next    当注册完成之后，需要调用的回掉方法，以继续其它操作
 * @return {mixed}                  多类型返回值
 */
const register = (server, options, next) => {

  if (__DEVELOPMENT__) registerDevelopmentOnly(server);

  return next();
};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'webpack',
  version: '0.0.0'
};

export default register;
