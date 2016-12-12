import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Layout from './Layout';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('APP: ', this.props);
    return (
      <div id='app'>
        <Helmet {...__FRONTEND__.head} />
        <Layout { ...this.props } id='app-layout' />
      </div>
    )
  }
}

export default App;
