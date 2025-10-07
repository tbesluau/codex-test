const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: __dirname,
    },
    port: 8080,
    compress: true,
    client: {
      overlay: true,
    },
  },
  resolve: {
    extensions: ['.js'],
  },
};
