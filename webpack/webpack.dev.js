var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  entry: {
    'main': './src/app.ts',
    'vendor': './src/vendors.ts'
  },
  output: {
    path: './dist',
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js'
  },
  devtool: 'cheap-module-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'ENV': require('../dev_env.json')
    }),
  ]
});