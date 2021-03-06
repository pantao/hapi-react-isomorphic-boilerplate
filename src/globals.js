import Config from 'config';

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

// 检测运行环境
const enviroment = process.env.NODE_ENV || 'development';
global.__ENVIROMENT__ = enviroment;
global.__DEVELOPMENT__ = enviroment === 'development';
global.__TESTING__ = enviroment === 'testing';
global.__PRODUCTION__ = enviroment === 'production';

global.__HELMET__ = Config.get('frontend.helmet');

const connection =  Config.get('server.connection');

global.SERVER_HOST = connection.host || '';
global.SERVER_PROTOCOL = connection.protocol || 'http';
global.SERVER_PORT = connection.port;
global.SERVER_URI = connection.uri;
