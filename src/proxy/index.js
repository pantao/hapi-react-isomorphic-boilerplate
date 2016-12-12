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
  return next();
};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'proxy',
  version: '0.0.0'
};

export default register;
