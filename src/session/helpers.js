import _ from 'lodash';
import JWT from 'jsonwebtoken';

/**
 * 创建 JsonWebToken
 * @param  {Object} credentials 认证对象
 * @param  {String} key         Json Web Token Secret Key
 * @return {String}             Json Web Token String
 */
export const generateJsonWebToken = (credentials, key) => {
  const session = {
    credentials,
    created: new Date()
  };
  return JWT.sign(session, key);
}

/**
 * 验证 JsonWebToken
 * @param  {Object}   decoded  解析后的对象
 * @param  {Hapi.request}   request  Hapi.Request 对象
 * @param  {Function} callback 回调函数
 * @return {Mixed}            多返回值类型
 */
export const validateJsonWebToken = (decoded, request, callback) => {
  if (!_.isObject(decoded) || !_.isObject(decoded.credentials)) {
    return callback(null, false);
  }

  const {
    credentials
  } = decoded;

  if (typeof credentials.id === 'undefined') {
    return callback(null, false);
  }

  callback(null, true, credentials);
}
