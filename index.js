require('fs').readFile('./.babelrc', (err, content) => {
  if( err ) throw err;
  try {
    const babelrc = JSON.parse(content);
    require('babel-core/register')(babelrc);

    require('./src/globals');

    global.__SERVER__ = true;

    const boot = require('./src/server').default;
    boot ( server => {
      let env = global.__ENVIROMENT__;
      for ( var key of Object.keys(server.connections) ) {
        let name = server.connections[key].name;
        let uri = server.connections[key].info.uri;
        console.info(`==> 🌎 Hapi ${env} Server(${name}) is listening on ${uri}`);
      }
    });
  } catch(e) {
    throw e;
  }
});
