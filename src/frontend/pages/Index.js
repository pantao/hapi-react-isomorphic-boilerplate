import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  renderSignRedirectTest() {
    if(this.props.session && this.props.session.me) {
      return <Link to='/sign'>此链接指向/sign，但您会自动跳转至 /dashboard</Link>
    } else {
      return null;
    }
  }

  render() {
    return (
      <section>
        <h1>首页</h1>
        <hr />
        {this.renderSignRedirectTest()}
        <hr />
        <button onClick={ () => {
            this.props.router.push('/about')
          }}>我是一个按钮，点击之后也会跳转至关于页面</button>
      </section>
    );
  }
};

export default Page;
