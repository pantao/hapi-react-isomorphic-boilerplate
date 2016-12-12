// 关于，为什么需要使用 fetchMiddleware
//
// 该中间界解决的问题最主要有下面这几个：
// 1. 统一了 Redux action 中数据请求方法的规范
// 2. 实现前后端渲染时，请求环境的一致性
// 3. 可以将 fetch 统一处理，无法在每次调用的地方都去引入 fetch
//
// 如何使用：
//
// 在 actions 中，需要定义三种 action.type
// 1. ACTION_NAME 原始 Action 名称
// 2. ACTION_NAME_SUCCEED 该 Action 成功之后的名称
// 3. ACTION_NAME_FAILD 该 Action 失败时的名称
// 不同的 Action ，只有 ACTION_NAME 部分不一致，后缀必须一致
//
// 然后在reducers 中使用 _SUCCEED Action 接收成功数据，使用 _FAILD 处理错误请求
const fetchMiddleware = fetcher => {
  return ({ dispatch, getState }) => {
    return next => action => {

      // 若 action 是一个 function，则直接继续
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      // 获取 fetch
      const { fetch, type, ...rest } = action;

      // 若没有 fetch，直接下一步
      if (!fetch) return next(action);

      const SUCCEED = type + '_SUCCEED';
      const REQUEST = type + '_REQUEST';
      const FAILD = type + '_FAILD';

      next({ ...rest, type: REQUEST });

      return fetch(fetcher)
        .then(
          data => next({ ...rest, data, type: SUCCEED }),
          error => next({ ...rest, error, type: FAILD })
        )
        .catch(
          error => {
            console.error('MIDDLEWARE ERROR:', error);
            next({ ...rest, error, type: FAILD });
          }
        );
    };
  };
};

export default fetchMiddleware;
