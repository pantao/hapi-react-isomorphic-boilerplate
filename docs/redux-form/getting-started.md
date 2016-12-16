# 开始使用 Redux Form

`redux-form` 主要解决下面四个问题：

1.  一个 *Redux Reducer* 监听所有 `redux-form` 操作，并在 *Redux* 中维护您的表单状态；
2.  一个 *React 组件装饰器*，将你的整个表单包装在一个高阶组件中（HOC），并通过 `props` 提供
    一些方便的功能；
3.  一个 `Field` 组件，将你的输入链接至 *Redux store* 中；
4.  各种用于在您的应用中与表单进行交互的 *Action Creators*。

## 实施指南

### 第一步：合并 redux-form reducer

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

### 第二步：装饰你的表单组件

第二步，就是使用 `reduxForm()` 函数装饰你的表单组件，这会通过 `props` 向你的表单组件提供一
些额外的功能函数以及 `state` 信息，以帮助你实现整个表单的业务。

每一个输入框都必须被包裹在 `Field` 组件的一个 `component` 属性中，`Field` 组件会将如
`value`、`onChange`、`onBlur` 等属性完全的转递给 `React.DOM.input` 组件，并计算它们的
值，以及监听它们的变更。

```javascript
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class SignUpForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='login'>登录名称</label>
          <Field name='login' component='input' type='text' placeholder='请输入您的登录名称'/>
        </div>
        <div>
          <label htmlFor='password'>帐户密码</label>
          <Field name='password' component='input' type='password' placeholder='请输入您的帐户密码'/>
        </div>
        <div>
          <button type='submit'>提交</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signup'
})(SignUpForm);
```

### 这样就足够了

好吧，就是这么简单的，你已经开始使用 `redux-form` 了，当然，真正的项目中，你可能还需要做一些
额外的工作：

-   当数据被提交的时候，你需要做一些操作，比如数据验证、提交给服务器等，整个表单的数据会以 `JSON`
    格式传递给你的 `onSubmit` 函数：

    ```javascript
    handleSignUpSubmit(values) {
      console.log(values);
    }

    renderSignUp() {
      return (
        <SignUpForm onSubmit={this.handleSignUpSubmit}/>
      )
    }
    ```

-   或许您还可能需要设置表单的初始值，可以使用 `initialValues` 属性：

> 如果您现在正在 `github` 上查看本文档的话，可以直接看看下面这个文件中的代码：
>
> - [src/frontend/components/sign/SignUpForm.js](../../src/frontend/components/sign/SignUpForm.js)

----------

下一篇：[理解 Field Value 的生命周期](field-value-lifecycle.md)
