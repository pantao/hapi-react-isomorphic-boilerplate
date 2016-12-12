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
  ]
}
