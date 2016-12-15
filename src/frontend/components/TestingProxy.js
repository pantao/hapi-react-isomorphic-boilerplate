import Promise from 'bluebird';
import React, { Component } from 'react';
import connectData from '../helpers/connectData';
import { tryTestingProxy } from '../actions/testing';

const fetchData = (getState, dispatch) => {
  return dispatch(tryTestingProxy());
}

@connectData(fetchData)
export default class TestingChild extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={ this.props.tryTestingProxy }>测试 /proixy/testing 代理</button>
        <pre>
          { JSON.stringify(this.props.testing.proxyData, ' ', 2)}
        </pre>
      </div>
    )
  }
}
