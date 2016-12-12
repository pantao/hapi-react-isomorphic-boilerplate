import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h1>控制面板</h1>
        <hr />
        <h2>{ this.props.session.credentials.login }, 您好</h2>
      </section>
    );
  }
};

export default Page;
