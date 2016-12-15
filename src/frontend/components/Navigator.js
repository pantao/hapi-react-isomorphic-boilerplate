import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

const links = [{
    path: '/about',
    title: '关于'
  }, {
    path: '/testing',
    title: '测试'
  }
];

class Navigator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pathname = this.props.location.pathname;
    return (
      <nav>
        <IndexLink to='/' activeClassName='current'>首页</IndexLink>
        {links.map((link, index) => <Link to={link.path} key={index} activeClassName='current'>{link.title}</Link>)}
        {
          this.props.session.me
          ? <Link to='/dashboard' activeClassName='current'>控制面板</Link>
          : <Link to='/sign' activeClassName='current'>登录</Link>}
      </nav>
    )
  }
}

export default Navigator;
