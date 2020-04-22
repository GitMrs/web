

const merge = require('webpack-merge');
const base = require('./webpack.base');
module.exports = merge({
  mode: 'development',
  devServer:{
    port:'8001',
    historyApiFallback:true,
    contentBase:'../dist',
    open:true,
    hot:true,
    proxy:{
      
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'less-loader'
        ]
      }
    ]
  },
  output:{
    filename:'[name].js',
    chunkFilename:'[name].js'
  }
}, base)