import _ from 'lodash';
import UUID from 'uuid';
import Promise from 'bluebird';

import HapiJWT from 'hapi-auth-jwt2';
import HapiAuthorization from 'hapi-authorization';

import {
  generateJsonWebToken,
  validateJsonWebToken
} from './helpers';

const register = (server, options, next) => {

  // 设置 session Cookie State Name
  server.state(options.cookie.name, {
    ttl: options.cookie.ttl,
    path: options.cookie.path,
    clearInvalid: options.cookie.clearInvalid,
    isSecure: options.cookie.isSecure,
    isHttpOnly: options.cookie.isHttpOnly,
    encoding: options.cookie.encoding
  });

  server.ext('onPostAuth', (request, reply) => {
    const { isAuthenticated }= request.auth;
    const expiredCredentials = request.auth.credentials || null;

    console.log(isAuthenticated);
  })

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

  const expose = {};
  expose.generateJsonWebToken = credentials => {
    return generateJsonWebToken(credentials, options.auth.jwt.secret);
  };
  expose.create = credentials => {
    let sid = UUID.v1();
    return new Promise((resolve, reject) => {
      sessions.set(sid, credentials, null, err => {
        console.log(err);
        if(err) return reject(err);
        resolve(sid);
      });
    })

    return sid;
  }

  server.decorate('server', 'session', expose);
  server.decorate('request', 'session', expose);

  server.register(plugins, err => {
    if (err) {
      server.log(['api', 'backend', 'plugin', 'register'], err);
    }
    server.auth.strategy('jwt', 'jwt', {
      key: options.auth.jwt.secret,
      validateFunc: validateJsonWebToken,
      verifyOptions: {
        algorithms: options.auth.jwt.algorithms
      }
    });
    server.auth.default('jwt');
    return next();
  });
}

register.attributes = {
  name: 'session',
  version: '0.0.0'
};

export default register;
