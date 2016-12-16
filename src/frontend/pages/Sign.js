import React, {Component} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import SignUpForm from '../components/sign/SignUpForm';

const state = {
  login: '',
  password: ''
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.handleFormField = this.handleFormField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goDashboard = this.goDashboard.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  handleFormField(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  goDashboard() {
    this.props.router.replace('/dashboard');
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state).then(() => {
      this.goDashboard();
    });
  }

  handleSignUpSubmit(values) {
    console.log(values);
  }

  renderSignUp() {
    return (
      <SignUpForm onSubmit={this.handleSignUpSubmit}/>
    )
  }

  renderLogin() {
    return (
      <div>
        <h1>登录</h1>
        <br/>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='loin'>用户名</label>
            <input placeholder='用户名' name='login' type='text' onChange={this.handleFormField}/>
          </div>
          <div>
            <label htmlFor='password'>密码</label>
            <input placeholder='密码：123456' type='password' name='password' onChange={this.handleFormField}/>
          </div>
          <div>
            <button type='submit'>登录</button>
          </div>
          <div>
            <Link to='/sign/up'>注册新帐户</Link>
          </div>
        </form>
      </div>
    )
  }

  render() {
    let renderFunc;
    switch (this.props.params.action) {
      case 'up':
        renderFunc = this.renderSignUp;
        break;
      default:
        renderFunc = this.renderLogin;
    }
    return (
      <section>
        {renderFunc()}
      </section>
    );
  }
};

export default Page;
