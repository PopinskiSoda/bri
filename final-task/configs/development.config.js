const webpack = require('webpack');
// const AssetsPlugin = require('assets-webpack-plugin');

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
      { test: /\.css$/, loader: 'style!css?sourceMap' },

      // нужно дополнительно применить плагин resolve-url,
      // чтобы логично работали относительные пути к изображениям
      // внутри *.scss файлов
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
      },

      // изображения
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?name=[path][name].[ext]&limit=8192'
      },

      // // шрифты
      // {
      //   test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/,
      //   loader: 'file?name=[path][name].[ext]'
      // },

      {
        test: /\.handlebars$/, loader: "handlebars-loader"
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
  // plugins: [
  //   // плагин нужен для генерация файла-манифеста, который будет использован
  //   // фреймворком для подключения js и css
  //   new AssetsPlugin({ prettyPrint: true })
  // ]
};