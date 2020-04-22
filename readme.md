# 从零构件Vue
  1. 安装 npm install -D webpack-cli webpack  // 安装webpack 核心依赖
  2. npm install babel-loader @babel/core @babel/preset-env 安装babel依赖
  3. mkdir build 
    - webpack.base.js
    - webpack.dev.js
    - webpack.prod.js
    - webpack.dll.js
  4. webpack.base.js
   ```
    const path = require('path');
    const webpack = require('webpack');
    const resolve = url => path.resove(__dirname,url)
    modules.exports = {
      entry:{
        main:'./src/index.js'
      },
      output:{
        path:resolve('../dist')
      },
      module:{
        rules:[
          {
            test:/\.jsx?$/,
            exclude:/node_modules/,
            include:resolve('../src'),
            use:[
              "babel-loader"
            ]
          }
        ]
      }
    }
  ```
  5. 创建文件夹
    - config // 配置webpack
    - src // 源码
    - public // html
  6. npm install -D html-webpack-plugin;
  7. 在webpack.base.js 加入html-webpack-plugin;
    ```
    ...
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ...
    modules.exports = {
      ...
      plugins:[
        new HtmlWebpackPlugin({
          template:resolve('../public/index.html'),
          filename:'index.html'
        })
      ]
    }
    ```
    8. npm install -D webpack-merge;
     - 在 webpapck.prod.js
      ```
        const merge = require('webpack-merge');
        const base = require('./webpack.base.js');
        module.exports = merge({
          mode:'production',
          output:{
            filename:'js/[name]_[content].js',
            chunkFilename:'js/[name]_[contenthash]_hash.js'
          }
        },base)
      ```
      - 在package.json
        ```
          script:{
            'dev':'webpack --confnig ./config/webpack.prod.js'
          }
        ```
    9. 新增css npm install css-loader style-loader 
      ```
        module.exports = {
          ...
          module:{
            rules:[
              ...
              {
                test:/\.css$/,
                use:['style-loader','css-loader']
              }
            ]
          }
        }
      ```
      10. 拆分css npm install mini-css-extract-plugin -D;
      
      ```
        consnt MiniCssExtractPlugin = require('mini-css-extract-plugin');
        module.exports = {
          ...
          plugins:[
            ...
            new MiniCssExtractPlugin({
              filename:'[name]_[hash].css',
              chunkFilename:'[name]_[hash].css'
            })
          ]
        }
      ```
      11. 配置深层次babel
        - npm install @babel/polyfill core-js -D
        .babelrc
        ```
        {
           "presets": [
              [
                "@babel/preset-env", // es6转es5
                {
                  "useBuiltIns":"usage", // 只编译需要编译的代码
                  "corejs":"3.0.1"
                }
              ]
            ]
        }
        ```
        .package.json
          ```
             "sideEffects": [
                "*.css",
                "*.less"
              ],
          ``` 