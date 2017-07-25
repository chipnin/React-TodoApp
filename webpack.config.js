var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'todo.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
         'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
    }),
    new ExtractTextPlugin("css/main.css"),
    new CopyWebpackPlugin([
        // Copy directory contents to {output}/to/directory/
        {
          from: './src/assets/images', 
          to: 'images' 
        },
    ])
  ]
};