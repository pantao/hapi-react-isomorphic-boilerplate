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
