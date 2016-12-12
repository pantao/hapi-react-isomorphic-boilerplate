import React, {Component} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

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

  render() {
    return (
      <section>
        <h1>登录</h1>
        <br/>
        <hr/>
        <form onSubmit={this.onSubmit}>
          {this.props.session.error
            ? <div>
                {this.props.session.error.message}
              </div>
            : null
}
          <input placeholder='用户名' name='login' onChange={this.handleFormField}/>
          <br/>
          <input placeholder='密码：123456' type='password' name='password' onChange={this.handleFormField}/>
          <br/>
          <button type='submit'>登录</button>
        </form>
      </section>
    );
  }
};

export default Page;