# 理解 Field Value 的生命周期

理解您表单中字段的值是在 `redux-form` 是怎么样传递的是很重要的一件事情。

## Value 生命周期钩子

`redux-form` 提供了三个 `value` 生命周期钩子，它们都是可选的。

### format(value:Any) => String

将 `value` 从 Redux store 中取出，并格式化成您的 `input` 组件使用的字符串，这最常被用于获
取如 `Number` 或者 `Date` 类型的数据。

### parse(value:String) => Any

将 `input` 组件中当前的数据，解析成为您想在 Redux store 中存储的数据格式。

### normalize(value:Any, previousValue:Any, allValues:Object, previousAllValues:Object) => Any

允许您基于整个表单的所有字段值为当前的字段添加逻辑处理，最常见的使用场景包含我们需要检测 `min`
值总是小于`max` 值的，如果您提供了 `parser`，那么，传递给该钩子的值将是已经被解析好了的。

## Value 生命周期

```text
Value from Redux Store            <---------+
        |                                   |
Formatted with format()                     |
        |                                   |
Input rendered                              |
        |                                   |
User changes value                          |
        |                                   |
Parsed with parse()                         |
        |                                   |
Normalized with normalize()                 |
        |                                   |
CHANGE action dispatched to update store  --+
```

----------

下一篇：[API: reduxForm()](api-reduxform.md)
