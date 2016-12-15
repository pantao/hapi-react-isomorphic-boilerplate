import {
  WechatContainer
} from './lib';
import Joi from 'joi';

const wechatContainer = new WechatContainer();

const registry = (server, options, next) => {
  wechatContainer.get('default', options.default).then(wechat => {
    server.route({
      method: ['get', 'post'],
      path: '/',
      config: {
        auth: false,
        validate: {
          query: Joi.object().keys({
            signature: Joi.string().allow(null).description('签名'),
            timestamp: Joi.string().allow(null).description('时间'),
            nonce: Joi.string().allow(null).description('-'),
            echostr: Joi.string().allow(null).description('-')
          }).unknown(true)
        }
      },
      handler: (request, reply) => {

        if (request.method === 'get') {
          return wechat.checkSignature(request.query, checked => {
            reply(checked ? request.query.echostr : '');
          })
        }

        const message = wechat.toJSON(request.payload);
        request.log(['wechat', 'request', 'message'], message);

        [message.ToUserName, message.FromUserName] = [message.FromUserName, message.ToUserName]

        reply(wechat.toXML(message));

      }
    });

    server.route({
      method: 'get',
      path: '/oauth',
      config: {
        auth: false
      },
      handler: (request, reply) => {
        const { code, state } = request.query;
        // 若没有 code 或者没有 state，则认为不是微信回调
        if(!code || !state) {
          return reply.redirect(wechat.getOAuthUrl('default', encodeURIComponent(`${request.headers['x-forwarded-proto'] || request.connection.info.protocol}://${request.info.host}${request.url.path}`)))
        }

        reply();
      }
    })

    next();
  });

};

registry.attributes = {
  name: 'wechat',
  version: '0.0.0'
};

export default registry;
