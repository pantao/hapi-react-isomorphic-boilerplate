# 开始使用 Redux Form

`redux-form` 主要解决下面四个问题：

1.  一个 *Redux Reducer* 监听所有 `redux-form` 操作，并在 *Redux* 中维护您的表单状态；
2.  一个 *React 组件装饰器*，将你的整个表单包装在一个高阶组件中（HOC），并通过 `props` 提供
    一些方便的功能；
3.  一个 `Field` 组件，将你的输入链接至 *Redux store* 中；
4.  各种用于在您的应用中与表单进行交互的 *Action Creators*。

## 实施指南

### 第一步：

要使用 `redux-form` 的第一步，就是将 `redux-form` 的 `reducer` 合并到 *Redux* 中，但不
管您需要在多少表单组件中使用 `redux-form`，您都只需要做一次合并即可。

```javascript
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  // ... 您的其它 reducer ...
  form: formReducer     // <---- 挂载到 'form' 字段上
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```
