const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '..'),
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'bundle-[name].js'
  },

  entry: ['./app.js', './app.scss', './app.haml'],
  resolve: {
    extensions: ['.js'],
    modules: [ 'node_modules' ],
    alias: {
      blocks: path.join(__dirname, '..', 'blocks'),
      utils: path.join(__dirname, '..', 'utils'),
      images: path.join(__dirname, '..', 'images'),
      fonts: path.join(__dirname, '..', 'fonts'),
      logic: path.join(__dirname, '..', 'logic'),
      configs: path.join(__dirname, '..', 'configs')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname + 'frontend/app') ],
        loader: 'babel?presets[]=es2015'
      },
    ],
  }
}