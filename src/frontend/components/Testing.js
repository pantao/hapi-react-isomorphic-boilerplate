import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Testing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <section>
      <Helmet title='测试' />
        <h1>接口与代理测试</h1>
        <br />
        <hr />
        <button onClick={ this.props.tryTesting }>测试 /api/testing 接口</button>
        <pre>
          { JSON.stringify(this.props.testing.data, ' ', 2)}
        </pre>
        <br />
        <hr />
        <button onClick={ this.props.tryTestingProxy }>测试 /proixy/testing 代理</button>
        <pre>
          { JSON.stringify(this.props.testing.proxyData, ' ', 2)}
        </pre>
      </section>
    );
  }
};

export default Testing;
