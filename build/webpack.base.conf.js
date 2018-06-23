'use strcit';

const {
  resolve,
  assetsPath,
  cssLoader
} = require('./utils');

const { dir } = require('../config');

module.exports = {
  context: resolve(`${dir.frontend}`),
  entry: {
    app: ['./index.js']
  },
  output: {
    path: resolve(`${dir.dist}/${dir.frontend}`),
    filename: assetsPath('js/[name].js'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(`${dir.frontend}`)],
        options: {
          emitWarning: true,
          configFile: `${dir.frontend}/.eslintrc.js`
        }
      },
      {
        test: /\.css$/,
        use: cssLoader()
      },
      {
        test: /\.styl$/,
        use: cssLoader('stylus')
      },
      {
        test: /assets[\\/]+?\S+\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
