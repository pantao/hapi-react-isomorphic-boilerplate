# Redux 文档

> 接选并翻译自 [http://redux.js.org/](http://redux.js.org/)

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

(如果你在找一款 Wordpress 框架，请移步 [Redux Framework](https://reduxframework.com/))。

可以让你构建运行于不同环境（客户端、服务器、原生应用）的一致化的应用，并且易于测试。同时，它还提
供超爽的开发体验，比如有一个[时间旅行调试器](https://github.com/gaearon/redux-devtools)
可以的你做任何编辑后立即实时预览。

你可以与 [React](https://facebook.github.io/react/) 或者任何其它的视图库绑定使用，并且，
包括它的依赖在内，也仅仅只有 2kb 左右。

## （作者的）开发经历

Redux 的开发，最早始于我为 *React Europe** 准备的名为
[时间旅行与热加载](https://www.youtube.com/watch?v=xsSnOQynTHs)的演讲，其实当时我的目标
很简单，就是创建一个状态管理库，仅提供最简单的 API，但是同时做到行为的完全可预测，因此才能让日
志打印、热加载、时间旅行、同构、录制以及回放等功能，在不需要作任何额外开发的前提下就能实现。

### 启示

Redux 的理念来源于 [Flux](http://facebook.github.io/flux/)，同时又受到
[Elm](http://elm-lang.org/guide/architecture) 的启发，但是避开了  Flux 的复杂性，不管
你有没有使用 Flux 或者 Elm，都能在几分钟之内就上手使用 Redux。

### 安装

安装稳定版本：

```bash
npm install --save redux
```

Redux 的源文件基于 ES2015 编写，但是会被预编译到 CommonJS 和 UMD 规范的 ES5，所以，你可以
在[任何现代浏览器](http://caniuse.com/#feat=es5)中使用它。

### 附加包

若您在 React 项目中使用 Redux，您可能还需要使用
[React Redux 绑定库](http://github.com/gaearon/react-redux) 和
[Redux 开发者工具](http://github.com/gaearon/redux-devtools)。

```bash
npm install --save react-redux
npm install --save-dev redux-devtools
```

> 需要提醒的是，与 Redux 不同，Redux 生态下的很多包并不提供 UMD 文件，所以，为了提升开发体
> 验，建议您最好使用像 [Webpack](http://webpack.github.io/) 和
> [Browserify](http://browserify.org/) 这样的 CommonJS 模块打包工具。

## 要点

任何一个 Redux 应用的所有 `state`，都以一个对象树的形式存储在一个单一的 `store` 中，改变
`state` 的唯一办法，就是触发相应的 `action` —— 一个用于描述发生了什么的对象。

同时，为了描述 `action` 如何改变 `state` 树，您还需要编写 `reducers`。

就像下面这样：

```javascript
import { createStore } from 'redux';

/**
 * 这是一个形式为 (state, action) => state 的纯函数，描述了 action 如何把 state 转变
 * 成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象，甚至是 Immutable.js 生成的数据结构。
 * 惟一的要点是：当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)根据不同的约定（如
 * 方法映射）来判断，只要适用你的项目即可。
 *
 * 对，这就是一个 reducer。
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

// 然后创建一个 Redux store 来存放应用的状态。
// store 的 API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

当你想对状态树进行修改时，应该以一个普通对象的形式来描述该修改，而不是直接修改状态树本身，这个
对象，我们称之为 `action`，然后，我们再编辑专门的函数，用于根据你的 `action` 来真正的更新状
态树，这个专门的函数，就是 `reducer`。

有了上面这些简单的了解之后，您还可以阅读 [Redux 基础使用文档](SUMMARY.md)
