const path = require('path')
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  output: {
    // добавлем хеш в имя файла
    filename: './bundle-[name]-[chunkhash].js',
    chunkFilename: 'bundle-[name]-[chunkhash].js',
    publicPath: '/bundles/'
  },
  module: {
    loaders: [
      // используем плагин для выделения CSS в отдельный файл
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css?minimize")
      },

      // sourceMap пришлось оставить из-за бага
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader", "css?minimize!resolve-url!sass?sourceMap"
        )
      },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192' },
      // {
      //   test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/,
      //   loader: 'file'
      // },
    ]
  },
  plugins: [
    // используем другое имя для манифеста, чтобы при релизе не перезаписывать
    // developoment версию
    // new AssetsPlugin({
    //   prettyPrint: true, filename: 'webpack-assets-deploy.json'
    // }),

    // файл с общим js-кодом для всех точек входа
    // Webpack самостоятельно его генерирует, если есть необходимость
    new webpack.optimize.CommonsChunkPlugin(
      'common', 'bundle-[name]-[hash].js'
    ),

    // выделяем CSS в отдельный файл
    new ExtractTextPlugin("bundle-[name]-[chunkhash].css", {
      allChunks: true
    }),

    // оптимизация...
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),

    // генерация gzip версий
    new CompressionPlugin({ test: /\.js$|\.css$/ }),

    // очистка перед очередной сборкой
    new CleanPlugin(
      path.join('public', 'assets', 'webpack'),
      { root: path.join(process.cwd()) }
    )
  ]
};