const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let devMode = process.env.devMode || true;
module.exports = {
  entry: ['./src/promise-fix.js', './src/entry.js'],
  mode: devMode ? "development" : "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'entry.bundle.js',
  },
  module: {
    rules: [
      {
         use: {
            loader:'babel-loader',
            options: { presets: ['es2015'] }
         },
         test: /\.js$/,
        //  exclude: /node_modules/
      },
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: false // Disable name mangling to avoid this issue: https://github.com/espruino/Espruino/issues/1367
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new WebpackBundleAnalyzer()
 ]
};