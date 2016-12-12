import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Layout from './Layout';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div id='app'>
        <Helmet {...__HELMET__.head} />
        <Layout { ...this.props } />
      </div>
    )
  }
}

export default App;
