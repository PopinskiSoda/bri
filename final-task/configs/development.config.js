const webpack = require('webpack');
// const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // debug: true,
  // outputPathinfo: true,
  // включаем source map
  devtool: 'eval-source-map',
  // displayErrorDetails: true,
  stats: {
    errorDetails: true
  },
  // output: {
  //   // фикс для правильного отображения source map у Vue JS компонентов
  //   devtoolModuleFilenameTemplate: info => {
  //     if (info.resource.match(/\.vue$/)) {
  //       $filename = info.allLoaders.match(/type=script/)
  //                 ? info.resourcePath : 'generated';
  //     } else {
  //       $filename = info.resourcePath;
  //     }
  //     return $filename;
  //   },
  // },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },

      // нужно дополнительно применить плагин resolve-url,
      // чтобы логично работали относительные пути к изображениям
      // внутри *.scss файлов
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap'
      },

      // изображения
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?name=[path][name].[ext]&limit=8192'
      },

      // // шрифты
      // {
      //   test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/,
      //   loader: 'file?name=[path][name].[ext]'
      // },

      {
        test: /\.handlebars$/, loader: "handlebars-loader",
        query: {
          partialDirs: [
            path.join(__dirname, '..', 'blocks')
          ],
          helperDirs: [
            path.join(__dirname, '..', 'utils')
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
    new ExtractTextPlugin("../index.html")
  ]
  // plugins: [
  //   // плагин нужен для генерация файла-манифеста, который будет использован
  //   // фреймворком для подключения js и css
  //   new AssetsPlugin({ prettyPrint: true })
  // ]
};