import _ from 'lodash';
import Joi from 'joi';

import {
  generateJsonWebToken
} from '../session/helpers';

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
  enableTesting: false
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
      const token = request.session.generateJsonWebToken(credentials);
      let authed = {
        token,
        credentials
      };
      request.session.create(authed).then( sid => {
        reply(authed).state('sid', sid );
      }).catch(e => {
        reply(e);
      });
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

  initTestingRoutes(server, config);
  next();
};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'backend',
  version: '0.0.0'
};

export default register;
