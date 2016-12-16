# API: reduxForm()

接受一个 `config` 参数，并创建一个修饰函数，该函数可以将你的表单组件链接至 `Redux`。

## Importing

```javascript
var reduxForm = require('redux-form').reduxForm;  // ES5
import { reduxForm } from 'redux-form';           // ES6
```

## Config 配置对象

**重要说明：任何配置选项都可能在 "设计时" 即传递给 `reduxForm()`，或者在运行时通过 `props`
传递给你的组件**

### 必须提供的字段

#### form : String

表单的名称，它将成为当前表单在 `redux-form reducer` 上的挂载点，注意，同一个应用中，不同的
表单都必须有不同的名称。

### 可选字段

#### -asyncBlurFields: Array<String>

一个数组，包含了一系列的表单中的字段名称，若某一个字段出现在该参数列中，则当 `onBlur` 事件产生
时，会触发 `asyncValidate` 函数。

#### asyncValidate: (values: Object, dispatch: Function, props: Object, blurredField: String) => Promise<undefined, errors:Object>

异步验证函数，当接受整个表单中的所有 `values`， `dispatch` 函数、当前组件的 `props` 以及当
前触发了 `onBlur` 字段值，返回一个 `Promise`，若 `validate` 通过，则 `Promise` 会
`resolve`， 否则会 `reject` 一个包含了所有错误信息的对象：

```javascript
{
  field1: <String>,
  field2: <String>
}
```

#### destroyOnUnmount : boolean

设置在您的组件被卸载时，是否自动的从 Redux store 中销毁，默认值为： `true`。

#### enableReinitialize : boolean

若设置为 `true`，则当 `initialValues` 属性变更时，会自动的重新初始化表单，默认为 `false`，
同时，若 `keepDirtyOnReinitialize` 选项设置为 `true` 的话，那么，在重新初始化表单时，只有
未被修改过的值会重新初始化，已变更过的值会一直保留当前状态。

#### getFormState : Function
