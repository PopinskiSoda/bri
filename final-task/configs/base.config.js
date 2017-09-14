const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '..'),
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'bundle-[name].js'
  },

  //  точки входа (entry point)
  // entry: {
    // здесь должен быть массив: ['./app/base-entry'], чтобы можно было
    // подключать одни точки входа в другие
    // обещают исправить в версии 2.0
    // application: ['./app/base-entry'],
    // main_page: ['./app/pages/main'],
    // admin_panel: ['./app/pages/admin_panel']
  // },
  entry: ['./app.js', './app.scss', './app.haml'],
  resolve: {
    // можно использовать require без указания расширения
    extensions: ['.js'],
    modules: [ 'node_modules' ],

    // еще одно улучшение для require: из любого файла можно вызвать
    // require('libs/some.lib')
    alias: {
      Blocks: path.join(__dirname, '..', 'blocks'),
      Utils: path.join(__dirname, '..', 'utils'),
      Images: path.join(__dirname, '..', 'images'),
      Fonts: path.join(__dirname, '..', 'fonts'),
      Logic: path.join(__dirname, '..', 'logic')
    }
  },
  module: {
    loaders: [
      // можно писать на ES6
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname + 'frontend/app') ],
        loader: 'babel?presets[]=es2015'
      },

      // для CoffeeScript
      // { test: /\.coffee$/, loader: 'coffee-loader' },

      // // для Vue JS компонентов
      // { test: /\.vue$/, loader: 'vue' },

      // автоматическая загрузка jquery при
      // первом обращении к переменным $ или
      // { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' }
    ],
  }
}