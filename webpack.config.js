'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'webpack-dev-server/client?http://127.0.0.1:8080/',
    './client/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'liteshop.js',
    publicPath: ''
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  // externals: {
  //   react: 'var React',
  //   'react-dom': 'var ReactDOM'
  // },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.(svg|ttf|woff|jpg|png|gif)$/,
        loaders: [
          'url'
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&importLoaders=1!less?sourceMap'
        ]
      }
    ]
  }
};
