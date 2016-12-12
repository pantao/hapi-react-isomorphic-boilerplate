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
        <h1>Index Page</h1>
        <Link to='about'>关于我们</Link>
      </section>
    );
  }
};

export default Page;
