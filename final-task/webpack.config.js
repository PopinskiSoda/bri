const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const CONFIGS_DIRNAME = 'configs';
const env = process.env.NODE_ENV || 'development';

module.exports = merge(
  require(path.join(__dirname, CONFIGS_DIRNAME, 'base.config.js')),
  require(path.join(__dirname, CONFIGS_DIRNAME, `./${env}.config.js`))
)