import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Testing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <section>
      <Helmet title='测试' />
        <h1>Testing Page</h1>
        <Link to='/'>首页</Link>
        <Link to='about'>关于我们</Link>
        <br />
        <button onClick={ this.props.testing }>测试 /api/testing 接口</button>
        <br />
        <button onClick={ this.props.testingProxy }>测试 /proixy/testing 代理</button>
      </section>
    );
  }
};

export default Testing;
