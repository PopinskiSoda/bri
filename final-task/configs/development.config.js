const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  stats: {
    errorDetails: true
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap!postcss-loader' },

      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap!postcss-loader'
      },

      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=[path][name].[ext]&limit=8192'
      },

      {
        test: /\.ttf$/,
        loader: 'file-loader?name=[path][name].[ext]&limit=8192'
      },

      {
        test: /\.handlebars$/, loader: "handlebars-loader",
        query: {
          partialDirs: [
            path.join(__dirname, '..', 'blocks')
          ],
          helperDirs: [
            path.join(__dirname, '..', 'blocks'),
            path.join(__dirname, '..', 'helpers')
          ]
        }
      },

      {
        test: /\.haml$/,
        loader: ExtractTextPlugin.extract("haml-loader")
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "post",
        loader: "jshint-loader",
        options: {
          forin: true,
          noarg: true,
          boss: true,
          loopfunc: true,
          evil: true,
          curly: true,
          nonew: true,
          esversion: 6,
          browser: true,
          jquery: true,
          devel: true
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new ExtractTextPlugin("./index.html"),
    new CopyWebpackPlugin([
      {
        from: './images',
        to: './images'
      }
    ])
  ]
};