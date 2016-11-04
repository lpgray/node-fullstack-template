const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
  entry: './client/app.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'liteshop.js',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
        drop_console: true
      },
      comments: false
    }),
    new ExtractTextPlugin('liteshop.css', {
      allChunks: true
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
          'file?name=[name].[sha512:hash:base64:8].[ext]'
        ]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      }
    ]
  }
};
