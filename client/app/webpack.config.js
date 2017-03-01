var webpackConfig;
require('babel-core/register');

switch (process.env.NODE_ENV) {
case 'production':
  console.log('Start building: use production.webpack');
  webpackConfig = require('./webpack/production.config');
  break;
case 'development':
  console.log('Start building: use development.webpack');
  webpackConfig = require('./webpack/development.config');
  break;
}

module.exports = webpackConfig;
