import _ from 'lodash';

const namedProxies = {};

const cachedHeaders = [
  'x-auth-ua',
  'x-auth-openid',
  'x-auth-token',
  'x-auth-is-android',
  'x-auth-is-app',
  'x-auth-is-ios',
  'x-auth-is-wechat',
  'x-source'
];

/**
 * 代理模块
 *
 * 为其它后端接口提供代理功能
 *
 * @param  {Hapi.server}    server  Hapi.Server 对象
 * @param  {Object}         options 配置选项
 * @param  {Function}       next    当注册完成之后，需要调用的回掉方法，以继续其它操作
 * @return {mixed}                  多类型返回值
 */
const register = (server, options, next) => {

  if (_.isObject(options) && _.isArray(options.proxies)) {
    const proxies = _(options.proxies).filter(p => p.enable).map(p => {
      namedProxies[`${options.prefix}/${p.name}`] = p;
      return {
        method: p.methods || ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS', "DELETE"],
        path: `/${p.name}/{path*}`,
        handler: {
          proxy: {
            passThrough: p.passThrough,
            xforward: p.xforward,
            mapUri: (request, callback) => {
              const uri = `${p.uri}/${request.params.path}`;
              callback(null, uri, request.headers)
            }
          }
        }
      }
    }).value();
    server.route(proxies);
  }

  server.ext('onPreHandler', (request, reply) => {
    let matched = _(Object.keys(namedProxies)).find(p => {

      return request.path.indexOf(p) === 0;
    });
    if (matched) {

      let proxy = namedProxies[matched];

      if (proxy && proxy.headers) {
        const {
          headers
        } = request.auth.credentials;

        const cachedHeaders = {};
        _(proxy.headers).each(ch => {
          cachedHeaders[ch] = request.headers[ch] || (_.isObject(headers) ? headers[ch] : '') || '';
        });

        console.log('cachedHeaders =>>>>>>>>>', request.headers);

        request.auth.credentials.headers = cachedHeaders;

        return request.session.set(request, request.auth.credentials).then( credentials => {
          request.headers = {
            ...request.headers,
            ...credentials.headers,
            'x-auth-ua': request.headers['user-agent']
          }
          reply.continue()
        }, e => {
          reply(e);
        }).catch(e => {
          reply(e);
        });
      }
    }
    reply.continue();
  });

  server.ext('onPreResponse', (request, reply) => {
    // console.log('request.headers from proxy: ',request.headers);
    reply.continue();
  })

  return next();
};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'proxy',
  version: '0.0.0'
};

export default register;
