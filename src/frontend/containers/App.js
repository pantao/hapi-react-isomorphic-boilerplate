import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import * as userAgentActions from '../actions/userAgent';

import App from '../components/App';

const mapStateToProps = state => {
  return {
    globalState: state,
    routing: state.routing,
    userAgent: state.userAgent
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...userAgentActions,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
