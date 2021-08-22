import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const mode = process.env.NODE_ENV || 'development';

export default {
  mode,
  resolve: {
    extensions: ['.js', '.jsx', 'css', 'sass'],
  },
  output: {
    filename: 'index.js',
    path: path.join(path.resolve(path.dirname('')), 'dist'),
  },
  devServer: {
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './server/views/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
