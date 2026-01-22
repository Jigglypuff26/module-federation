const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3000/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        reactRemote: 'reactRemote@http://localhost:3001/remoteEntry.js',
        vueRemote: 'vueRemote@http://localhost:3002/remoteEntry.js',
        angularRemote: 'angularRemote@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        'react-router-dom': {
          singleton: true,
        },
        vue: {
          singleton: true,
          requiredVersion: '^3.3.0',
          eager: true,
        },
        // Angular dependencies для загрузки Angular Remote
        '@angular/core': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        '@angular/common': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        '@angular/compiler': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        '@angular/forms': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        '@angular/platform-browser': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        '@angular/platform-browser-dynamic': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        '@angular/elements': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^17.0.0',
          eager: true,
        },
        rxjs: {
          singleton: true,
          strictVersion: false,
          eager: true,
        },
        'zone.js': {
          singleton: true,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
