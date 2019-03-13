const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const scriptLinks = require("./webpack_plugins/script-links");
const cssLinks = require("./webpack_plugins/css-links");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//const CompressionPlugin = require("compression-webpack-plugin");
//const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: 'inline-source-map',
  module: {
    rules: [{
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].bundle..css"
    }),
    new CleanWebpackPlugin(['dist']),
    //new CompressionPlugin(),
    //new MinifyPlugin(),
    new scriptLinks({
      options: true
    }),
    new cssLinks({
      options: true
    })
  ],
  entry: {
    index: "./src/index.js",
    consultant: "./src/consultant.js",
    client: "./src/client.js",
    admin: './src/admin.js'
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  optimization: {
    //minimizer: [
      /*new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }), //,*/
      // new OptimizeCSSAssetsPlugin()
    //],
    splitChunks: {
      chunks: "all"
    }
  }
};
