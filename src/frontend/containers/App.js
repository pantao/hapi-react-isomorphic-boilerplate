import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import * as userAgentActions from '../actions/userAgent';
import * as testingActions from '../actions/testing';
import * as sessionActions from '../actions/session';

import App from '../components/App';

const mapStateToProps = state => {
  return {
    globalState: state,
    routing: state.routing,
    userAgent: state.userAgent,
    testing: state.testing,
    session: state.session
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...userAgentActions,
    ...testingActions,
    ...sessionActions,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
