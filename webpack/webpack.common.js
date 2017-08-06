var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var ROOT = path.resolve(__dirname, '..');

var extractCSS = new ExtractTextPlugin('assets/css/[name].[hash].css', {
    allChunks: true
});

module.exports = {
  entry: {
    'main': './src/app.ts',
    'vendor': './src/vendors.ts'
  },
  output: {
    path: './dist',
    publicPath: '/assets/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.css', '.scss', '.json', '.less'],
    modulesDirectories: ['node_modules']
  },

  module: {
    preLoaders: [
      {test: /\.ts$/, loader: 'tslint'}
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript'
      },
      {
        test: /\.jade$/,
        loader: 'file-loader?name=templates/[1]/[name].[hash].html&regExp=src/(.*)/(.*).jade!extract-loader!html-loader?attrs=img:src!jade-html'
      },
      {
        test: /\.html$/,
        exclude: /index\.html/,
        loader: 'file-loader?name=templates/[name].[hash].html!extract-loader!html-loader'
      },
      {
        test: /\.scss$/,
        include: /\/src\/vendor(.*)/,
        loader: extractCSS.extract('style', 'css!autoprefixer-loader?browsers=last 2 versions!sass')
      },
      {
        test: /\.scss$/,
        exclude: /\/src\/vendor(.*)/,
        loader: 'file-loader?name=assets/css/[2].[hash].[ext]&regExp=src/(.*)/(.*).scss!autoprefixer-loader?browsers=last 2 versions!sass'
      },
      {
        test: /\.css$/,
        exclude: /\/src\//,
        loader: extractCSS.extract('style', 'css', 'autoprefixer-loader?browsers=last 2 versions')
      },
      {
        test: /\.css$/,
        include: /\/src\//,
        loader: 'file-loader?name=assets/css/[2].[hash].[ext]&regExp=src/(.*).css!autoprefixer-loader?browsers=last 2 versions'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /font/,
        loader: "file-loader?&name=assets/images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/i,
        exclude: /image/,
        loader: "file-loader?limit=100000&name=assets/fonts/[name].[hash].[ext]"
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose?jQuery!expose?jquery!expose?$'
      },
      {
        test: /enquire/,
        loader: 'expose?enquire'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    extractCSS,
    new CleanWebpackPlugin(['dist'], {
      root: ROOT,
      verbose: true,
      dry: false,
      exclude: ['media', 'static']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      'Tether': 'tether',
      '_': 'lodash'
    }),
    new CopyWebpackPlugin([
      {
        context: 'src',
        from: 'assets/images/**/*',
        to: '../dist'
      },
      {
        context: 'src',
        from: 'assets/templates/**/*',
        to: '../dist'
      }
    ]),
  ],

  devServer: {
    port: 8000,
    host: 'localhost',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: './src',
    historyApiFallback: true
  }
};
