

const merge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtracPlugin = require('mini-css-extract-plugin');
module.exports = merge({
  mode:'production',
  output:{
    filename:'js/[name]_[content].js',
    chunkFilename:'js/[name]_[cententhash].chunk.js'
  },
  module:{
    rules:[
      {
        test:/\.(css|less)$/,
        use:[
          {
            loader:MiniCssExtracPlugin.loader,
            options:{
              filename:'[name].css',
              chunkFilename:'[name].css',
              publicPath:'../'
            }
          },
          {
            loader:'css-loader',
            options:{
              importLoaders:2
            }
          },
          'less-loader'
        ]
      }
    ]
  }
},base)