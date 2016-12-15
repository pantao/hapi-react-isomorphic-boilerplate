import Promise from 'bluebird';
import React, {Component} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import {tryTesting} from '../actions/testing';
import connectData from '../helpers/connectData';
import TestingChild from './TestingChild';
import TestingProxy from './TestingProxy';

const fetchData = (getState, dispatch) => {
  const promises = [];
  if (!getState().testing.data) {
    promises.push(dispatch(tryTesting()).then(() => {}));
  }
  return Promise.all(promises);
}

@connectData(fetchData, null, [TestingProxy])
class Testing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <section>
        <Helmet title='测试'/>
        <h1>接口与代理测试</h1>
        <br/>
        <hr/>
        <button onClick={this.props.tryTesting}>测试 /api/testing 接口</button>
        <pre>
          { JSON.stringify(this.props.testing.data, ' ', 2)}
        </pre>
        <br/>
        <hr/>
        <TestingProxy {...this.props}/>
        <hr/>
        <TestingChild/>
      </section>
    );
  }
};

export default Testing;
