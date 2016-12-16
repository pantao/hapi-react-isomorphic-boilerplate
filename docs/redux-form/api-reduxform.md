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

一个函数，用于接收整个 Redux state，同时返回 `redux-form reducer` 挂载点的状态树片段，此
方法很少用到，默认的，都假设 `reducer` 挂载至 `form` 键上。

#### keepDirtyOnReinitialize : boolean

当该值设置为 `true` ，同时 `enableReinitialize` 同样的也被设置为 `true`，则当表单重新初
始化时，会保留被修改过的值，否则整个表单的值都会被重新初始化。该字段是一个十分有用的设置，它可
以保证我们在初始值变化时，不会丢失用户新输入的内容。

#### initialValues : Object<String, String>

表单字段的默认值，它们会在 `componentWillMount()` 中被初始化至表单中，该对象就是一个标准的
键值对对象，键与值均为字符串： `{ field1: 'value1', field2: 'value2'}`。

#### onSubmit : Function

该函数会在 `handleSubmit()` 函数被触发时执行，若您没有在此处指定，则您必须以一个参数的形式在
您的表单组件中传递给 `handleSubmit()` 方法。

若 `onSubmit()` 返回一个 `promise`，则 `submitting` 属性会被设置为 `true`，直到该
`promise` 被 `resolve` 或者被 `reject`，若 `reject` 的是一个如：
`{field1: 'error1', field2: 'error2'}` 形式的 `SubmissionError` 的话，那么所有出错的
字段都会被添加上这些错误，就像 `async validation` 错误一样。若错误并不特写于任何一个字段，
但是却适用于整个表单，那么你可以通过一个名为 `_error` 的字段传递该钷误，同时它会以 `error`
属性提供给您的表单。

`onSubmit` 函数会接受以下三个参数：

1.  `values` : Object

    包含表单中所有值的对象： `{field1: 'value1', field2: 'value2'}`。

2.  `dispatch` : Function

    Redux `dispatch` 函数

3.  `props` : Object

    被传递给你的已修饰了的组件的 `props`。

#### onSubmitFail : Function

当表单的提交出现任何错误时，该函数都会被触发，它将接受以下几个参数：

1.  `errors` : Object

    导致表单提交失败的错误

2.  `dispatch` : Function

    Redux `dispatch`

3.  `submitError` : errors

    导致表单失败的错误，若 `errors` 存在，该值更多的情况下，将是一个 `SubmissionError`，
    否则，它将可能是任何 `error` 或者仅仅就是一个 `null`。

#### onSubmitSuccess : Function

当表单提交成功时，将会被触发，它将接受以下几个参数：

1.  `result` : Object

    `onSubmit` 方法返回的对象。

2.  `dispatch` : Function

    Redux `dispatch` 函数。

#### propNamespace : String

If specified, all the props normally passed into your decorated component directly will be passed under the key specified. Useful if using other decorator libraries on the same component to avoid prop namespace collisions.

#### pure : boolean

If true, implements shouldComponentUpdate and shallowly compares only the Redux-connected props that are needed to manage the form state, preventing unnecessary updates, assuming that the component is a “pure” component and does not rely on any input or state other than its props and the selected Redux store’s state. Defaults to true.

#### shouldValidate(params) : boolean

一个可选的可以让你完全控制 `sync validation` 行为的函数，您的 `shouldValidate()` 函数将
接受以下参数：

1.  `values`: Object

    表单中的数据： `{field1: 'value1', field2: 'value2'}`

2.  `nextProps` : Object

3.  `props` : Object

    当前的 `props`

4.  `initialRender` : boolean

    当表单已经被初始化渲染后，该值为 `true`

5.  `structure` : Object

    `structure` 对象被用于内部的值，您同样需要使用 `deepEqual` 与该对象进行比对。

#### shouldAsyncValidate(params) : boolean

一个可选的可以让你完全控制 `async validation` 行为的函数，您的 `shouldAsyncValidate()`
函数将接受以下参数：

1.  `asyncErrors` : Object

    任何已存在的异步验证错误

2.  `initialized` : boolean

    当表单已经基于 `initialValues` 初始化之后，该值为 `true`

3.  `trigger` : String

    触发 `async validation` 的原因，它可以是 `blur` 、`submit`，这取决于当前的异步验证
    是由某个字段的 `onBlur` 事件触发，还是由表单的提交事件触发。

4.  `blurredField` : String

    若当前的异步验证是由某个字体面的 `onBlur` 事件触发，那么该值为该字段名，或者为 `undefined`

5.  `pristine` : boolean

    当表单未作任何修改时，此值为 `true`，否则该值为 `false`。

6.  `syncValidationPasses` : boolean

    当同步验证通过时，该值为 `true` ，否则该值为 `false`。

该方法若未提供，那么将有默认函数提供，其默认行为是：

```javascript
if(!syncValidationPasses) {
  return false
}
switch(trigger) {
  case 'blur':
    // blurring
    return true
  case 'submit':
    // submitting, so only async validate if form is dirty or was never initialized
    // conversely, DON'T async validate if the form is pristine just as it was initialized
    return !pristine || !initialized
  default:
    return false
}
```

#### touchOnBlur : boolean

当字段的 `blur` 事件触发后，是否设置该字段为 `touched`，默认为 `true`。

#### touchOnChange : boolean

当字段的 `change` 事件触发后，是否设置该字段为 `touched`，默认为 `false`。

#### persistentSubmitErrors: boolean

当 `change` 事件发生时，是否移除所有 `submit` 错误，默认为 `false`。

#### validate : (values:Object, props:Object) => errors:Object

同步验证函数，接受表单的所有值，返回错误对象，若验证通过，错误对象应该是一个空对象 `{}`，否则
应该返回如下格式的错误对象：`{field1: 'error1', field2: 'error2'}`。

#### warn : (values:Object, props:Object) => warnings:Object

与 `validate` 类似，只不过返回的是警告，而非错误。

## 实例  API

下面这些方法或者属性，您都可以通过表单组件的实例访问到。

### dirty : boolean

当前表单是否不同于 `initialValues`，若相同，则为 `false`，否则为 `true`。

### invalid : boolean

当前表单是否验证未通过，若有任何验证错误，该值为 `true`，否则为 `false`。

### pristine : boolean

当表单当前的值与初始值一样时，该值为 `true`，否则为 `false`。

### registeredFields : Array

包含当前表单中所有字段的数组，数组元素为对象，包含 `name` 与 `type` 字段。

### reset() : void

重置整个表单值初始值

### submit() : Promise

提交该表单，返回一个 `promise`，成功时，`resolve`，否则 `reject` 错误。

### valid : boolean

当前表单是否验证通过，通过为 `true`，否则为 `false`。

### values ： Object

当前表单的所有字段的值。

### wrappedInstance : ReactElement

一个指向被 `reduxForm()` 修饰的原始的 `React.Component`。
