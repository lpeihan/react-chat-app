'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { dir } = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

exports.resolve = function(dir = '') {
  return path.join(__dirname, '..', dir);
};

exports.assetsPath = function(_path) {
  return path.posix.join(`${dir.static}`, _path);
};

exports.cssLoader = function(loader) {
  const loaders = [
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true }
    }
  ];

  if (loader) {
    loaders.push({
      loader: `${loader}-loader`,
      options: { sourceMap: true }
    });
  }

  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader'
    });
  } else {
    return ['style-loader'].concat(loaders);
  }
};
