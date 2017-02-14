import webpack from 'webpack';
import baseConfig from './base.config';
// import I18nPlugin from 'i18n-webpack-plugin';

// const languages = {
//   en: null,
//   'zh-cn': require('../locale/zh-cn'),
//   'zh-tw': require('../locale/zh-tw'),
// };

// module.exports = Object.keys(languages).map((language) => {
//   baseConfig.output.filename = language + '.app.js';
//   baseConfig.plugins = [
//     ...baseConfig.plugins,
//     new webpack.optimize.UglifyJsPlugin({ test: /\.jsx?$/ }),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.DedupePlugin(),
//     new I18nPlugin(languages[language]),
//   ];
//   return baseConfig;
// });

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({ test: /\.jsx?$/ }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
};
