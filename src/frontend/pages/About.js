import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const startDevelopOnOSXBash = `# 安装 homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 使用 brew 安装 wget
brew install wget

# 安装 MongoDB
brew install mongodb

# 安装 Redis
brew install redis

# 下载本样板代码
cd /path/to/your/workspace
wget https://github.com/pantao/hapi-react-isomorphic-boilerplate/archive/master.zip -o YOUR_PROJECT_NAME.zip
unzip YOUR_PROJECT_NAME.zip
cd YOUR_PROJECT_NAME

# 启动开发服务
./start-develop.sh`;

class Page extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <section>
        <article>
          <h1>Hapi React Isomorphic Boilerplate</h1>
          <blockquote>
            <p>基于 HapiJS + ReactJS 的前后端同构系统样板</p>
          </blockquote>
          <h2>开始你的新项目</h2>
          <h3>说明</h3>
          <ol>
            <li>项目使用了 Redis 为系统提供缓存服务， Session 依赖于该服务</li>
            <li>项目推荐使用 MongoDB 作为数据库系统</li>
            <li>若不需要以上数据库服务，请在相应的配置文件中关闭相关的设置，然后还需要更新 server.js 中 默认缓存服务的配置（默认使用的是 Redis 数据库）</li>
          </ol>
          <h3>OS X 系统</h3>
          <pre>{ startDevelopOnOSXBash }</pre>
        </article>
      </section>
    );
  }
};

export default Page;
