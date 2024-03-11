const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = userPath => ({
  mode: 'production',
  target: 'node',
  entry: userPath,
  output: {
    path: path.resolve(__dirname, 'dist-export'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!lek-photographic-studio\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],

});
module.exports = webpackConfig;