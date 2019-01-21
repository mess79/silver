const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

module.exports = {
  mode: "production",
  devtool: 'inline-source-map',
  module: {
    rules: [
      //{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      //{ test: /\.png$/, loader: 'file-loader' },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      excludeAssets: [/^((?!index).)*$/],
      title: 'Index',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'consultant.html',
      excludeAssets: [/^((?!consultant).)*$/],
      title: 'Consultant',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'client.html',
      excludeAssets: [/^((?!client).)*$/],
      title: 'Client',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      excludeAssets: [/^((?!admin).)*$/],
      title: 'Admin',
      template: 'views/vuetest.pug'
    }),

    new HtmlWebpackExcludeAssetsPlugin()
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
    splitChunks: {
      chunks: "all"
    }
  }
};
