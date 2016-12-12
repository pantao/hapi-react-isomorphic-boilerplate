module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "HRIB",
      script    : "index.js",
      env: {
        NODE_ENV: "development"
      },
      env_production : {
        NODE_ENV: "production"
      },
      env_testing : {
        NODE_ENV: "testing"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "root",
      host : "10.141.5.88",
      ref  : "origin/master",
      repo : "https://github.com/pantao/hapi-react-isomorphic-boilerplate.git",
      path : "/opt/yrd_app",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    testing : {
      user : "root",
      host : "10.141.5.88",
      ref  : "origin/master",
      repo : "https://github.com/pantao/hapi-react-isomorphic-boilerplate.git",
      path : "/opt/yrd_app",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env testing"
      env  : {
        NODE_ENV: "testing"
      }
    }
  }
}
