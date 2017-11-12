const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
      chunks: ['app']
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }, {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader',
          options: {
            // attrs: [':data-src']
          }
        }]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
