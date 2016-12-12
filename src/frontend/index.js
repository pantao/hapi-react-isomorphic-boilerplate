/**
 * 前端模块
 *
 * 当服务器注册该模块后，会提供前端项目的服务器端渲染功能
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
  name: 'frontend',
  version: '0.0.0'
};

export default register;
