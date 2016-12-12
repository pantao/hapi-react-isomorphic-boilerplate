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
import proxy from './proxy';
import webpack from './webpack';

const getConfig = endpoint => {
  return JSON.parse(JSON.stringify(Config.get(endpoint)));
}

const boot = callback => {

  // 创建 Hapi.Server 对象
  const serverConfig = getConfig('server');
  const server = new Hapi.Server(serverConfig.options)

  server.log(['log', 'server', 'bootstrap'], serverConfig);
  console.log(serverConfig);

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
        prefix: Config.get('proxy.prefix')
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
        prefix: Config.get('backend.prefix')
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
