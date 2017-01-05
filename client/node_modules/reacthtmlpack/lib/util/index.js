

/**
 * @package
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.replaceWithHtmlExt = replaceWithHtmlExt;
exports.markupFileToWriteFileCreator = markupFileToWriteFileCreator;
exports.entryListFileToEntry = entryListFileToEntry;
exports.webpackConfigArrayToIndexFilepathMap = webpackConfigArrayToIndexFilepathMap;
exports.singleStatsArrayAndIndexFilepathMapCombiner = singleStatsArrayAndIndexFilepathMapCombiner;
exports.entryListFileAndFilepathWebpackStatsMapCombiner = entryListFileAndFilepathWebpackStatsMapCombiner;
exports.addDevServerToWebpackConfigCreator = addDevServerToWebpackConfigCreator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _path = require("path");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _rx = require("rx");

var _rx2 = _interopRequireDefault(_rx);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

/**
 * @package
 */
var mkdirp = _rx.Observable.fromNodeCallback(_mkdirp2["default"]);

exports.mkdirp = mkdirp;
/**
 * @package
 */
var writeFile = _rx.Observable.fromNodeCallback(_fs2["default"].writeFile);

exports.writeFile = writeFile;
/**
 * @private
 */

function replaceWithHtmlExt(filepath) {
  var dirpath = (0, _path.dirname)(filepath);

  var basename = (0, _path.basename)(filepath);

  while (true) {
    var ext = (0, _path.extname)(basename);
    if (ext) {
      basename = (0, _path.basename)(basename, ext);
    } else {
      return (0, _path.resolve)(dirpath, basename + ".html");
    }
  }
}

/**
 * @package
 */

function markupFileToWriteFileCreator(destDir) {
  return function (_ref) {
    var relativePath = _ref.relativePath;
    var markup = _ref.markup;

    var filepath = replaceWithHtmlExt((0, _path.resolve)(destDir, relativePath));

    return mkdirp((0, _path.dirname)(filepath)).selectMany(function () {
      return writeFile(filepath, markup);
    }).map(function () {
      return filepath;
    });
  };
}

/**
 * @package
 */

function entryListFileToEntry(entryListFile) {
  return _rx.Observable.from(entryListFile.entryList);
}

/**
 * @package
 */

function webpackConfigArrayToIndexFilepathMap(webpackConfigArray) {
  return webpackConfigArray.reduce(function (acc, _ref2, index) {
    var webpackConfigFilepath = _ref2.webpackConfigFilepath;

    return _extends({}, acc, _defineProperty({}, index, webpackConfigFilepath));
  }, {});
}

/**
 * @package
 */

function singleStatsArrayAndIndexFilepathMapCombiner(singleStatsArray, filepathByIndex) {
  return singleStatsArray.reduce(function (acc, singleStats, index) {
    var filepath = filepathByIndex[index];

    return _extends({}, acc, _defineProperty({}, filepath, singleStats));
  }, {});
}

/**
 * @package
 */

function entryListFileAndFilepathWebpackStatsMapCombiner(entryListFile, webpackStatsByFilepath) {
  return _extends({}, entryListFile, {
    entryList: null,
    outputAssetListById: entryListFile.entryList.reduce(function (acc, _ref3) {
      var id = _ref3.id;
      var configFilepath = _ref3.configFilepath;
      var chunkName = _ref3.chunkName;

      var webpackStats = webpackStatsByFilepath[configFilepath];
      var outputAssetList = [].concat(webpackStats.statsJson.assetsByChunkName[chunkName]).map(function (assetName) {
        return {
          rawAsset: webpackStats.stats.compilation.assets[assetName],
          publicFilepath: "" + webpackStats.statsJson.publicPath + assetName
        };
      });
      return _extends({}, acc, _defineProperty({}, id, outputAssetList));
    }, {})
  });
}

function addDevServerToWebpackConfigCreator(devServerConfigFilepath) {
  if (!devServerConfigFilepath) {
    return _lodash2["default"].identity;
  }

  return function (webpackConfigWithFilepath) {
    var webpackConfigFilepath = webpackConfigWithFilepath.webpackConfigFilepath;
    var webpackConfig = webpackConfigWithFilepath.webpackConfig;

    if (webpackConfigFilepath !== devServerConfigFilepath) {
      return webpackConfigWithFilepath;
    }

    var devServer = webpackConfig.devServer;

    var inlineDevServerChunkList = [require.resolve("webpack-dev-server/client/") + ("?http://" + devServer.host + ":" + devServer.port), "webpack/hot/dev-server"];

    return _extends({}, webpackConfigWithFilepath, {
      webpackConfig: _extends({}, webpackConfig, {
        reacthtmlpackDevServer: true,
        entry: _lodash2["default"].mapValues(webpackConfig.entry, function (filepathList) {
          return inlineDevServerChunkList.concat(filepathList);
        }),
        plugins: [].concat(_toConsumableArray(webpackConfig.plugins), [new _webpack2["default"].HotModuleReplacementPlugin()])
      })
    });
  };
}