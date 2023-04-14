const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // template: './src/index.ejs',
      template: path.join(__dirname, 'src/index.ejs'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/about.ejs'), // 要使用的模板文件，不指定则使用默认
      filename: 'about.html', // 生成输出的文件名
    }),
  ],
  devServer: {
    static: {
      // 要監聽的資料夾路徑
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader'],
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader',
            options: {
              esModule: false,
              variable: 'data',
            },
          },
        ],
      },
    ],
  },
};
