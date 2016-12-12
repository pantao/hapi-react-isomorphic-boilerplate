import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h1>About Page</h1>
        <Link to='/'>返回首页</Link>
        <Link to='testing'>Redux测试</Link>
      </section>
    );
  }
};

export default Page;