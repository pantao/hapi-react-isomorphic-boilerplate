import _ from 'lodash';

import testing from './testing';
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

const register = (server, options, next) => {

  let config = _.cloneDeep(defaults);
  if(_.isObject(options)) {
    config = _.assign(config, options);
  }

  if(config.enableTesting) {
    server.register({
      register: testing
    });
  }
  next();
};

register.attributes = {
  dependencies: [], //模块的依赖
  name: 'backend',
  version: '0.0.0'
};

export default register;
