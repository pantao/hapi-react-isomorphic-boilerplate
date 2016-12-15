# Hapi React Isomorphic Boilerplate

> 基于 HapiJS + ReactJS 的前后端同构系统样板

## 开始你的新项目

### 说明

- 项目使用了 Redis 为系统提供缓存服务， Session 依赖于该服务
- 项目推荐使用 MongoDB 作为数据库系统
- 若不需要以上数据库服务，请在相应的配置文件中关闭相关的设置，然后还需要更新 server.js 中
  默认缓存服务的配置（默认使用的是  Redis 数据库）

### OS X 系统

```bash
# 安装 homebrew
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
./start-develop.sh
```
