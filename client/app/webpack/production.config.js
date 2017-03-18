import webpack from 'webpack';
import baseConfig from './base.config';

export default {
  ...baseConfig,
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({ test: /\.jsx?$/ }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
};
