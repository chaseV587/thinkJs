let {nativeConfig} = require('./webpack.base.conf.js')

const webpack = require('webpack')
const ZipWebpackPlugin = require('zip-webpack-plugin')

nativeConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),
  new ZipWebpackPlugin({
    path: '../',
    filename: 'dist.zip'
  })
)

module.exports = nativeConfig
