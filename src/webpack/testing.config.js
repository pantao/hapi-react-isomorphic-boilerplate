const webpack = require('webpack');
const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');
const WebpackStrip = require('strip-loader');
module.exports = {
  devtool: 'eval',
  entry: {
    client: './src/frontend/client.js',
    vendor: [
      'react',
      'react-dom',
      'isomorphic-fetch',
      'redux',
      'react-redux',
      'redux-form',
      'react-router',
      'react-router-redux',
      'query-string',
      'react-helmet',
      'bluebird'
    ]
  },
  output: {
    path: './public/assets/',
    filename: '[name]-[hash].min.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name]-[hash].min.js',
      // minChunks: (mod, count) => {
      //   if(typeof mod.userRequest !== 'string') return false;
      //   console.log(mod.userRequest, count);
      //   return mod.userRequest.indexOf('node_modules') >= 0 && count >= 2;
      // }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('testing'),
      '__SERVER__': false,
      '__CLIENT__': true
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    preLoaders: [{
      test: /(\.js[x]?|.es6)$/,
      exclude: /node_modules/,
      loader: WebpackStrip.loader('debug', 'console.log')
    }],
    loaders: [{
      test: /(\.js[x]?|.es6)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'style-loader!less-loader'
    }, {
      test: /(\.png|\.jp[e]?g)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'url-loader?limit=100000'
    }, {
      test: /\.json$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'json-loader'
    }]
  }
};
