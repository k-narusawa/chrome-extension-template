const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

module.exports = {
  entry: {
    popup: path.join(srcDir, 'popup_page.tsx'),
    options: path.join(srcDir, 'options_page.tsx'),
  },
  output: {
    path: path.join(__dirname, "../build/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
          return chunk.name !== 'background';
      }
    },
  },
  plugins: [
    new Dotenv({
      safe: true,
      allowEmptyValues: false,
    })
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public", 
        transform: {
          transformer(content, path){
            if(path.toString().includes('manifest.json')){
              return content.toString()
                .replace('__CLIENT_ID__', process.env.CLIENT_ID)
            }
            return content
          }
        } 
      }],
    }),
  ],
};