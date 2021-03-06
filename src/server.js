import _ from 'lodash';
import Promise from 'bluebird';
import Config from 'config';

import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import Good from 'good';
import HapiSwagger from 'hapi-swagger';
import H2o2 from 'h2o2';

import backend from './backend';
import frontend from './frontend';
import wechat from './wechat';
import proxy from './proxy';
import webpack from './webpack';
import session from './session';

const getConfig = endpoint => {
  return JSON.parse(JSON.stringify(Config.get(endpoint)));
}

const boot = callback => {

  // 创建 Hapi.Server 对象
  const serverConfig = getConfig('server');
  if(serverConfig.options.cache) {
    let cacheConfig = serverConfig.options.cache;
    serverConfig.options.cache = _.map(cacheConfig, cc => {
      let engine = require('catbox-' + cc.module);
      delete cc.module;
      return {
        ...cc,
        engine
      }
    })

  }
  const server = new Hapi.Server(serverConfig.options)

  server.log(['log', 'server', 'bootstrap'], serverConfig);

  // 创建默认连接
  server.connection(serverConfig.connection);
  server.connections[0].name = 'Hapi React Iosmorphic Boilerplate Connection';
  server.register(Inert);
  server.register(Vision);
  server.register({
    register: Good,
    options: Config.get('logger')
  });

  if (Config.has('public.enable') && Config.get('public.enable')) {
    server.log(['log', 'server', 'bootstrap', 'service', 'config'], getConfig('public'));
    server.route({
      method: 'GET',
      path: '/{params*}',
      config: {
        auth: false,
        state: {
          failAction: 'ignore'
        }
      },
      handler: {
        directory: getConfig('public.options')
      }
    })
  }

  // 注册基础服务
  const services = [];
  services.push({
    register: session,
    options: getConfig('session.options')
  });
  // 若 proxy.enable 为 true，则加载 proxy 服务
  if (Config.has('proxy.enable') && Config.get('proxy.enable')) {
    server.log(['log', 'server', 'bootstrap', 'service', 'config'], getConfig('proxy'));
    services.push({
      register: H2o2
    });

    services.push({
      register: proxy,
      options: getConfig('proxy.options'),
      routes: {
        prefix: Config.get('proxy.options.prefix')
      }
    });
  }

  // 若 backend.enable 为 true，则加载 backend 服务
  if (Config.has('backend.enable') && Config.get('backend.enable')) {
    server.log(['log', 'server', 'bootstrap', 'service', 'config'], getConfig('backend'));
    services.push({
      register: backend,
      options: getConfig('backend.options'),
      routes: {
        prefix: Config.get('backend.options.prefix')
      }
    });
  }

  if (Config.has('swagger.enable') && Config.get('swagger.enable')) {
    server.log(['log', 'server', 'bootstrap', 'service', 'config'], getConfig('swagger'));
    services.push({
      register: HapiSwagger,
      options: getConfig('swagger.options')
    });
  }

  // 若 frontend.enable 为 true，则加载 frontend 服务
  if (Config.has('frontend.enable') && Config.get('frontend.enable')) {
    server.log(['log', 'server', 'bootstrap', 'service', 'config'], getConfig('frontend'));
    services.push({
      register: webpack
    })
    services.push({
      register: frontend,
      options: getConfig('frontend.options')
    });
  }

  // 若 wechat.enable 为 true，则加载 wechat 服务
  if (Config.has('wechat.enable') && Config.get('wechat.enable')) {
    server.log(['log', 'server', 'bootstrap', 'service', 'config'], getConfig('wechat'));
    services.push({
      register: wechat,
      options: getConfig('wechat.options'),
      routes: {
        prefix: Config.get('wechat.options.prefix')
      }
    });
  }

  server.register(services, err => {
    if (err) {
      server.log(['log', 'server', 'bootstrap', 'error'], err);
      throw err;
    }

    return server.start(() => {
      if (_.isFunction(callback))
        callback(server);
    });
  });
};

export default boot;
