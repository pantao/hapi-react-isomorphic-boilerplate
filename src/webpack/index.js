/**
 * Webpack 模块
 *
 * 为开发环境提供 Webpack 服务，该服务支持代码的热更新与服务器端动态 bundle 功能
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
  name: 'webpack',
  version: '0.0.0'
};

export default register;
