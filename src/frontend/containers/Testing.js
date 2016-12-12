import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import * as userAgentActions from '../actions/userAgent';
import * as testingActions from '../actions/testing';

import Testing from '../components/Testing';

const mapStateToProps = state => {
  return {
    globalState: state,
    routing: state.routing,
    userAgent: state.userAgent,
    testing: state.testing
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...userAgentActions,
    ...testingActions,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Testing)
