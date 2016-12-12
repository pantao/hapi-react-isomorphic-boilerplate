import React, { Component } from 'react';
import { Link } from 'react-router';

const links = [
  {
    path: '/',
    title: '首页'
  },
    {
      path: '/about',
      title: '关于'
    },
  {
    path: '/testing',
    title: '测试'
  },
  {
    path: '/sign',
    title: '登录'
  },
  {
    path: '/dashboard',
    title: '控制面板'
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
        {
          links.map( (link, index) => <Link to={link.path} key={index} className={ pathname === link.path ? 'current' : ''}>{link.title}</Link>)
        }
      </nav>
    )
  }
}

export default Navigator;
