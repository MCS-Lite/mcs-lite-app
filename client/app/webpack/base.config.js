import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import inputStyle from 'postcss-input-style';
import webpack from 'webpack';

const vendorCssExtractor = new ExtractTextPlugin('webpack-vendor.css');
const cssExtractor = new ExtractTextPlugin('webpack-client.css');

const CSS_LOADER_LIST = [
  'style',
  'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss',
];

const JS_FILENAME_FORMAT = '[name].js';

export default {
  context: path.resolve(__dirname, '../'),
  output: {
    path: path.resolve(__dirname, '../build/assets'),
    filename: JS_FILENAME_FORMAT,
    publicPath: 'assets/',
  },
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new webpack.EnvironmentPlugin('DOMAIN_ENV'),
    cssExtractor,
    vendorCssExtractor,
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: [
          /font-awesome\.css/,
          /normalize\.css/,
          /codemirror\.css/,
        ],
        loader: cssExtractor.extract(CSS_LOADER_LIST[0], CSS_LOADER_LIST.slice(1).join('!'), { publicPath: '' }),
      },
      {
        test: /\.css$/,
        include: [
          /font-awesome\.css/,
          /normalize\.css/,
          /codemirror\.css/,
        ],
        loader: vendorCssExtractor.extract('style', 'css', { publicPath: '' }),
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=[name].[ext]' },
      { test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=[name].[ext]' },
      { test: /\.svg\?v=[0-9]\.[0-9]\.[0-9]$/, loaders: ['url?limit=10000&minetype=application/font-woff', 'img']},
      { test: /\.(svg|png|jpg|jpeg)$/, loaders: ['url?limit=10000&name=[name].[ext]']},
      { test: /\.json$/, loaders: ['json']},
    ],
  },
  postcss() {
    return [autoprefixer, inputStyle];
  },
};

