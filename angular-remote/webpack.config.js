const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devServer: {
    port: 3003,
    hot: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3003/',
    clean: true,
    uniqueName: 'angularRemote',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularRemote',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/app/app.component.ts',
        './AppElement': './src/app/app-element.ts',
      },
      shared: {
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
      template: './src/index.html',
    }),
  ],
};
