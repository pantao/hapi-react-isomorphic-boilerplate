import _ from 'lodash';
import UUID from 'uuid';
import Promise from 'bluebird';

import HapiAuthCookie from 'hapi-auth-cookie';

const register = (server, options, next) => {

  const plugins = [];
  plugins.push({
    register: HapiAuthCookie
  });

  server.register(plugins, err => {
    if (err) {
      server.log(['api', 'backend', 'plugin', 'register'], err);
    }

    const cache = server.cache({
      cache: 'redisCache',
      segment: 'sessions',
      expiresIn: options.cookie.ttl
    });

    server.app.cache = cache;

    const expose = {};
    expose.set = (request, credentials) => {
      let sid = credentials.sid || UUID.v1().replace(/-/g, '');
      credentials.sid = sid;

      if (_.isObject(credentials.headers)) {
        credentials.headers['x-auth-uuid'] = credentials.headers['x-auth-uuid'] || UUID.v1();
        credentials.headers['x-auth-uaid'] = credentials.headers['x-auth-uuid'];
      }

      return new Promise((resolve, reject) => {
        cache.set(sid, credentials, 0, err => {
          if (err) {
            return reject(err);
          }

          request.cookieAuth.set({
            sid: sid
          });
          return resolve(credentials);
        });
      })
    }

    expose.update = (request, credentials) => {
      return new Promise((resolve, reject) => {
        if(!credentials.sid) {
          return reject(new Error('没有 sid'));
        }
        if (_.isObject(credentials.headers)) {
          credentials.headers['x-auth-uuid'] = credentials.headers['x-auth-uuid'] || UUID.v1();
          credentials.headers['x-auth-uaid'] = credentials.headers['x-auth-uuid'];
        }
        cache.set(credentials.sid, credentials, 0, err => {
          if (err) {
            return reject(err);
          }
          return resolve(credentials);
        });
      })
    }

    server.decorate('request', 'session', expose);

    server.auth.strategy('session', 'cookie', {
      password: options.cookie.password,
      cookie: options.cookie.name,
      isSecure: options.cookie.isSecure,
      ttl: options.cookie.ttl,
      validateFunc: (reqeust, session, callback) => {
        cache.get(session.sid, (err, cached) => {
          if (err) return callback(err, false);
          if (!cached) return callback(null, false);
          return callback(null, true, cached);
        });
      }
    });
    server.auth.default('session');
    return next();
  });
}

register.attributes = {
  name: 'session',
  version: '0.0.0'
};

export default register;
