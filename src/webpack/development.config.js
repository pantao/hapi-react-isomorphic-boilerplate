const webpack = require( 'webpack' );
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    './src/frontend/client.js'
  ],
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
      '__SERVER__': false,
      '__CLIENT__': true
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    // new ApplicationInstaller({ options: 'files' })
  ],
  module: {
    loaders: [
      {
        test: /(\.js[x]?|.es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react', 'stage-0' ],
          plugins: [
            [ 'transform-decorators-legacy' ],
            [ 'transform-runtime' ],
            [ 'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: [ 'react' ],
                locals: [ 'module' ],
              }, {
                transform: 'react-transform-catch-errors',
                imports: [ 'react', 'redbox-react' ],
              }]
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!less-loader'
      },
      {
        test: /(\.png|\.jp[e]?g)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'json-loader'
      }
    ]
  },
};
