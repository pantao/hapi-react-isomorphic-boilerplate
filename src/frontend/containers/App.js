import React, {Component} from 'react';
import Helmet from 'react-helmet';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userAgentActions from '../actions/userAgent';
import * as testingActions from '../actions/testing';
import * as sessionActions from '../actions/session';

import Layout from '../components/Layout';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='app'>
        <Helmet {...__HELMET__.head}/>
        <Layout {...this.props}/>
      </div>
    )
  }
}

const container = store => {
  const mapStateToProps = state => {
    return {globalState: state, routing: state.routing, userAgent: state.userAgent, testing: state.testing, session: state.session};
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      ...userAgentActions,
      ...testingActions,
      ...sessionActions,
      dispatch
    }, dispatch);
  };

  return {
    path: '/',
    onEnter: (next, replace, callback) => {
      callback();
    },
    component: connect(mapStateToProps, mapDispatchToProps)(App)
  };
}
export default container;
