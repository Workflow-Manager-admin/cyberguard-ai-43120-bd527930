const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// PUBLIC_INTERFACE
module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      inject: "body",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../public"),
    },
    port: process.env.PORT || 3001, // Default to 3001 for dev
    hot: true,
    historyApiFallback: true,
    open: true,
    host: "0.0.0.0"
  },
  devtool: "eval-source-map",
  mode: "development",
};
