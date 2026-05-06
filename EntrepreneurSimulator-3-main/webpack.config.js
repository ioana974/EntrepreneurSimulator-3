const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: path.resolve(__dirname, 'js', 'game.jsx'),
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'game.bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};