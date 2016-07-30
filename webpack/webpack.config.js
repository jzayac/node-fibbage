'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var root = path.join(__dirname, '../');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(root, 'app/client.js')
  ],
  output: {
    path: path.join(root, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        // cacheDirectory: true,
        plugins: ['transform-decorators-legacy' ],
        presets: ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    // },
    // {
    //    test: /\.png$/,
    //    loader: "url-loader?limit=100000"
    //  },
    //  {
    //    test: /\.jpg$/,
    //    loader: "file-loader"
    //  },
    //  {
    //    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    //    loader: 'url?limit=10000&mimetype=application/font-woff'
    //  },
    //  {
    //    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    //    loader: 'url?limit=10000&mimetype=application/octet-stream'
    //  },
    //  {
    //    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    //    loader: 'file'
    //  },
    //  {
    //    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    //    loader: 'url?limit=10000&mimetype=image/svg+xml'
     }

  ]
  }
};
