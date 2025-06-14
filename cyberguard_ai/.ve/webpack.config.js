const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../src'),
    },
    port: devPort,
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all', // Allow all hosts to resolve 'Invalid Host Header'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      inject: 'body',
    }),
  ],
  mode: 'development',
};
