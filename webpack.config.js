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
      favicon: 'src/images/favicon.ico',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'consultant.html',
      excludeAssets: [/^((?!consultant).)*$/],
      title: 'Consultant',
      favicon: 'src/images/favicon.ico',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'client.html',
      excludeAssets: [/^((?!client).)*$/],
      title: 'Client',
      favicon: 'src/images/favicon.ico',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      excludeAssets: [/^((?!admin).)*$/],
      title: 'Admin',
      favicon: 'src/images/favicon.ico',
      template: 'views/vuetest.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/reset_request.html',
      excludeAssets: [/^((?!reset_request).)*$/],
      title: 'Reset Request',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/reset_request.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/reset_request_submitted.html',
      excludeAssets: [/^((?!reset_request_submitted).)*$/],
      title: 'Reset Request Submitted',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/reset_request_submitted.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/reset_password.html',
      excludeAssets: [/^((?!reset_password).)*$/],
      title: 'New password submittion',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/reset_password.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/reset_password_submitted.html',
      excludeAssets: [/^((?!reset_password_submitted).)*$/],
      title: 'New password submitted',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/reset_password_submitted.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/register.html',
      excludeAssets: [/^((?!register).)*$/],
      title: 'New User',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/register.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/logoff.html',
      excludeAssets: [/^((?!logoff).)*$/],
      title: 'Logoff',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/logoff.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/login.html',
      excludeAssets: [/^((?!login).)*$/],
      title: 'Login',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/login.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'auth/activation_request.html',
      excludeAssets: [/^((?!activation_request).)*$/],
      title: 'Activation Request',
      favicon: 'src/images/favicon.ico',
      template: 'views/auth/activation_request.pug'
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
