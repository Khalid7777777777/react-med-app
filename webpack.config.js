// Import necessary plugins and modules
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of the application
  entry: './src/index.js',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Module rules for processing files
  module: {
    rules: [
      {
        // Rule for JavaScript files
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // Rule for CSS files
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  // Optimization settings
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  // Plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ],

  // Development server configuration
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware can be added here if needed
      return middlewares;
    },
  },
};
