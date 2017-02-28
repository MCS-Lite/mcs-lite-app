import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import baseConfig from './base.config';

export default {
  ...baseConfig,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/dev-server',
    ...baseConfig.entry,
  ],
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: process.env.PORT || 8081,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, '../build'),
    publicPath: '/',
    hot: true,
    stats: { colors: true },
    historyApiFallback: true,
    inline: true,
  },
};
