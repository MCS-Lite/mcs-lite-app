import path from 'path';
import baseConfig from './base.config';

export default {
  ...baseConfig,
  devtool: 'eval',
  output: {
    ...baseConfig.output,
    publicPath: '/assets/',
  },
  devServer: {
    port: process.env.PORT || 8081,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, '../build'),
    publicPath: '/assets/',
    hot: true,
    stats: { colors: true },
    historyApiFallback: true,
  },
};
