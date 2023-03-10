
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = JSON.parse(fs.readFileSync('./buildconf.json'));
const is_development = config['mode'] == 'development';

module.exports = {
    entry: path.resolve(__dirname, '../src/scripts/main.js'),
    module: {
      rules: [
        { test: /\.(js)$/, use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      ]
    },
    output: {
      path: path.resolve(config['outDir']),
      filename: 'main.js'
    },
    mode: config['mode'],
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        filename: path.resolve(config['outDir'], 'index.html')
      })
    ],
    watch: is_development
  }
