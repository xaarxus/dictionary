const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    open: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './server/views/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};