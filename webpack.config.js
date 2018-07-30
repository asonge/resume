const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackDashboard = require('webpack-dashboard/plugin');
const path = require('path');

module.exports = {
  // context: path.resolve(__dirname, 'src'),
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  "targets": {
                    "browsers": ["last 2 versions", "safari >= 7"]
                  }
                }
              ]
            ],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpackDashboard(),
    new HtmlWebpackPlugin({
      title: "Alex Songe's Resume",
      template: path.resolve(__dirname, 'pages/index.pug')
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].css"
    }),
  ]
};
