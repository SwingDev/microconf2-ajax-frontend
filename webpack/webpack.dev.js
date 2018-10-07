const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const base = require('./webpack.base')

if (process.env.ANALYZER) {
  base.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

module.exports = merge(base, {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0',
    'webpack/hot/only-dev-server'
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /src[\\\/](.*)\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader?sourceMap&insertAt=top',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[folder]__[local]--[hash:base64:5]',
              modules: true,
              importLoaders: 1,
              sourceMap: true
            }
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap'
        ]
      },
      {
        test: /node_modules[\\\/](.*)\.css$/,
        exclude: /src[\\\/](.*)\.css$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap'
        ]
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /\.js|node_modules/,
      failOnError: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    namedModules: true
  }
})
