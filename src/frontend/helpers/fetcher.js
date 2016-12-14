import Promise from 'bluebird';
import Fetch from 'isomorphic-fetch';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * 格式化URL地址
 *
 * 根据当前运行环境以及接口前缀，
 * @param  {String} [path=''] [description]
 * @return {[type]}           [description]
 */
const formatUrl = (path = '', scope = '') => {
  const adjusted = path[0] !== '/' ? `/${path}` : path;

  if (__SERVER__) {
    const host = SERVER_HOST ? SERVER_HOST : '127.0.0.1';
    // 若是在服务器上，则将路径转换为带协议、主机名以及端口号的完整路径
    return `${SERVER_PROTOCOL}${host}:${SERVER_PORT}${API_PREFIX}${adjusted}`;
  }
  return `${scope || ''}${adjusted}`;
}

/**
 * 向URL地址中附近加查询参数
 *
 * @param  {String} url        原始URL地址
 * @param  {Object} [query={}] 查询对象
 * @return {String}            添加了查询参数之后的URL地址
 */
const attachQuery = (url, query = {}) => {
  let result = url;
  let concatParams = null;
  let count = 0;
  let and = '';

  if (typeof query !== 'undefined') {
    result = url + '?';

    for (const param in query) {
      and = count > 0 ? '&' : '';
      if (query.hasOwnProperty(param)) {
        concatParams = and + param + '=' + query[param];
      }
      count++;
    }
    result = urlResult + concatParams;
  }

  return result;
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return null;
}

const parseJSON = response => {
  if (response !== null) {
    return response.json();
  }
  return null;
}

class Fetcher {
  constructor(request) {
    methods.forEach(method => {
      this[method] = (path, {
        headers,
        query,
        data
      } = {}) => new Promise((resolve, reject) => {
        let body = null;
        let content = '';
        headers = typeof headers === 'object' ? headers : {};

        if(localStorage) {
          try {
            let authorization = localStorage.getItem('authorization');
            authorization = JSON.parse(authorization);
            if(authorization) {
              headers.authorization = authorization;
            }
          } catch(e) {

          }
        }

        if (__SERVER__ && request && request.headers.cookie) {
          headers.Cookie = request.headers.cookie;
        }

        if (!__SERVER__ && typeof query !== 'undefined') {
          path = attachQuery(path, query);
        }

        if (!__SERVER__ && typeof data !== 'undefined') {
          body = JSON.stringify(data);
        }

        if (body !== null) {
          content = {
            credentials: 'same-origin',
            method,
            headers,
            body
          };
        } else {
          content = {
            credentials: 'same-origin',
            method,
            headers
          };
        }

        const url = formatUrl(path);
        console.log( url );
        Fetch(url, content)
          .then(parseJSON)
          .then(response => {
            if (!response.error) {
              resolve(response);
            } else {
              reject(new Error(response.error))
            }
          });
      });
    });
  }
}

export default Fetcher;
