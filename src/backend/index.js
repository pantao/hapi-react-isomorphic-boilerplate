import _ from 'lodash';
import Joi from 'joi';

import HapiJWT from 'hapi-auth-jwt2';
import HapiAuthorization from 'hapi-authorization';

import {
  generateJsonWebToken,
  validateJsonWebToken
} from './helpers';

/**
 * 服务器后端模块
 *
 * 提供项目的基于 NODEJS 的后端接口
 *
 * @param  {Hapi.server}    server  Hapi.Server 对象
 * @param  {Object}         options 配置选项
 * @param  {Function}       next    当注册完成之后，需要调用的回掉方法，以继续其它操作
 * @return {mixed}                  多类型返回值
 */
const defaults = {
  enableTesting: false,
  auth: {
    enable: true,
    jwt: {
      enable: true,
      key: 'jwtk'
    }
  }
}

const initTestingRoutes = (server, options ) => {
  if(!options.enableTesting) {
    return;
  }
  server.route({
    method: ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS', "DELETE"],
    path: '/testing/{path*}',
    config: {
      auth: false,
      tags: ['api', 'testing'],
      validate: {
        params: Joi.object().keys({
          path: Joi.string().allow(null).description('路径')
        })
      }
    },
    handler: (request, reply) => {
      reply({
        query: request.query,
        payload: request.payload,
        params: request.params,
        headers: request.headers,
        method: request.method
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/sign/in',
    config: {
      auth: false,
      tags: ['api', 'testing', 'session'],
      validate: {
        payload: Joi.object().keys({
          login: Joi.string().email().required().description('邮箱地址'),
          password: Joi.string().min(4).required().description('帐户密码')
        })
      }
    },
    handler: (request, reply) => {
      const credentials = request.payload;
      credentials.id = 0;
      const token = generateJsonWebToken(credentials, options.auth.jwt.secret);
      reply({
        token,
        credentials
      }).state('authorization', token);
    }
  });

  server.route({
    method: 'GET',
    path: '/me',
    config: {
      tags: ['api', 'testing', 'session'],
      validate: {}
    },
    handler: (request, reply) => {
      reply({
        token: 'TOKEN',
        credentials: request.auth.credentials
      });
    }
  });
}

const register = (server, options, next) => {

  let config = _.cloneDeep(defaults);
  if(_.isObject(options)) {
    config = _.assign(config, options);
  }

  server.state('authorization', {
    ttl: 3600 * 1000 * 24,
    isSecure: true,
    isHttpOnly: false,
    encoding: 'none',
    clearInvalid: false,
    strictHeader: false
  });

  const plugins = [];
  plugins.push({
    register: HapiJWT
  });
  plugins.push({
    register: HapiAuthorization,
    options: {
      roles: options.auth.roles
    }
  });

  server.register(plugins, err => {
    if(err) {
      server.log(['api', 'backend', 'plugin', 'register'], err);
    }
    server.auth.strategy('jwt', 'jwt', {
      key: config.auth.jwt.secret,
      validateFunc: validateJsonWebToken,
      verifyOptions: {
        algorithms: config.auth.jwt.algorithms
      }
    });
    server.auth.default('jwt');
    initTestingRoutes(server, config);
    return next();
  });

};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'backend',
  version: '0.0.0'
};

export default register;
