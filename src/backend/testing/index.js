import _ from 'lodash';
import Joi from 'joi';

const register = (server, options, next) => {
  server.route({
    method: ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS', "DELETE"],
    path: '/testing/{path*}',
    config: {
      tags: ['api', 'testing'],
      validate: {
        params: Joi.object().keys({
          path: Joi.string().allow(null).description('路径')
        })
      },
      auth: false
    },
    handler: (request, reply) => {

      reply({
        auth: request.auth,
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
      credentials.id = Math.floor(Math.random() * 10000000);
      request.session.set(request, credentials).then( sid => {
        reply(credentials).state('sid', sid );
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
      reply(request.auth.credentials);
    }
  });
}

register.attributes = {
  name: 'testing',
  version: '0.0.0'
}

export default register;
