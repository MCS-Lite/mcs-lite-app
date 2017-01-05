"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntryListFile = createEntryListFile;
exports.createWebpackConfigArray = createWebpackConfigArray;
exports.createWebpackConfigFilepathByIndex = createWebpackConfigFilepathByIndex;
exports.buildToDir = buildToDir;
exports.watchAndBuildToDir = watchAndBuildToDir;
exports.devServer = devServer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require("path");

var _rx = require("rx");

var _rx2 = _interopRequireDefault(_rx);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _coreIndex = require("./core/index");

var _utilIndex = require("./util/index");

/**
 * @private
 */

function createEntryListFile(srcPatternList) {
  return _rx.Observable.from(srcPatternList).selectMany(_coreIndex.createGlobResult).selectMany(_coreIndex.globResultToFile).selectMany(_coreIndex.addCodeToFile).map(_coreIndex.addElementToFile).map(_coreIndex.addEntryListToFile);
}

/**
 * @private
 */

function createWebpackConfigArray(entryListFile, devServerConfigFilepath) {
  return entryListFile.selectMany(_utilIndex.entryListFileToEntry).groupBy(function (entry) {
    return entry.configFilepath;
  }).selectMany(_coreIndex.groupedEntryListToWebpackConfig).map((0, _utilIndex.addDevServerToWebpackConfigCreator)(devServerConfigFilepath)).reduce(_coreIndex.webpackConfigReducer, []);
  // Un-comment to demonstrate hot v.s. cold Observable
  // .tap(::console.log)
}

/**
 * @private
 */

function createWebpackConfigFilepathByIndex(webpackConfigArray) {
  return webpackConfigArray.map(_utilIndex.webpackConfigArrayToIndexFilepathMap);
}

/**
 * @public
 */

function buildToDir(destDir, srcPatternList) {

  var sharedReplayEntryListFileStream = createEntryListFile(srcPatternList).shareReplay();

  var publishedWebpackConfigArrayStream = createWebpackConfigArray(sharedReplayEntryListFileStream).publish();

  var webpackConfigFilepathByIndexStream = createWebpackConfigFilepathByIndex(publishedWebpackConfigArrayStream);

  var writeToFileResultStream = publishedWebpackConfigArrayStream.map(function (webpackConfigArray) {
    return webpackConfigArray.map(function (_ref) {
      var webpackConfig = _ref.webpackConfig;
      return webpackConfig;
    });
  }).tap(_coreIndex.webpackConfigArrayInspector).map(_coreIndex.webpackConfigArrayToWebpackCompiler).selectMany(_coreIndex.webpackMultiCompilerToMultiStats).map(_coreIndex.webpackMultiStatsToWebpackSingleStatsArray).withLatestFrom(webpackConfigFilepathByIndexStream, _utilIndex.singleStatsArrayAndIndexFilepathMapCombiner).selectMany(function (w) {
    return sharedReplayEntryListFileStream.map(function (e) {
      return (0, _utilIndex.entryListFileAndFilepathWebpackStatsMapCombiner)(e, w);
    });
  }).map(_coreIndex.withOutputAssetsFileToMarkupFile).selectMany((0, _utilIndex.markupFileToWriteFileCreator)(destDir));

  writeToFileResultStream.subscribe(function (it) {
    return console.log("Next: " + it);
  }, function (error) {
    throw error;
  }, function () {
    return console.log("Done!");
  });

  publishedWebpackConfigArrayStream.connect();
}

/**
 * @public
 */

function watchAndBuildToDir(destDir, srcPatternList) {

  var sharedReplayEntryListFileStream = createEntryListFile(srcPatternList).shareReplay();

  var publishedWebpackConfigArrayStream = createWebpackConfigArray(sharedReplayEntryListFileStream).publish();

  var webpackConfigFilepathByIndexStream = createWebpackConfigFilepathByIndex(publishedWebpackConfigArrayStream);

  var writeToFileResultStream = publishedWebpackConfigArrayStream.map(function (webpackConfigArray) {
    return webpackConfigArray.map(function (_ref2) {
      var webpackConfig = _ref2.webpackConfig;
      return webpackConfig;
    });
  }).tap(_coreIndex.webpackConfigArrayInspector).selectMany(function webpackConfigArrayRunWithWatchToSingleStatsArray(webpackConfigArray) {
    // Why selectMany? Because watch could be repeative.
    // Instead of wrapping one value, now a series of values are emitted.
    return _rx.Observable.from(webpackConfigArray).map(_coreIndex.webpackConfigArrayToWebpackCompiler).selectMany(_coreIndex.webpackCompilerRunWithWatchToSingleStatsWithIndex).scan(function (acc, it) {
      acc = [].concat(_toConsumableArray(acc));
      var index = it.index;

      var rest = _objectWithoutProperties(it, ["index"]);

      acc[index] = rest;

      return acc;
    }, new Array(webpackConfigArray.length)).takeWhile(function (webpackSingleStatsArray) {
      return webpackSingleStatsArray.every(_lodash2["default"].identity);
    });
  }).withLatestFrom(webpackConfigFilepathByIndexStream, _utilIndex.singleStatsArrayAndIndexFilepathMapCombiner).selectMany(function (w) {
    return sharedReplayEntryListFileStream.map(function (e) {
      return (0, _utilIndex.entryListFileAndFilepathWebpackStatsMapCombiner)(e, w);
    });
  }).map(_coreIndex.withOutputAssetsFileToMarkupFile).selectMany((0, _utilIndex.markupFileToWriteFileCreator)(destDir));

  writeToFileResultStream.subscribe(function (it) {
    return console.log("Next: " + it);
  }, function (error) {
    throw error;
  }, function () {
    return console.log("Done!");
  });

  publishedWebpackConfigArrayStream.connect();
}

/**
 * @public
 */

function devServer(relativeDevServerConfigFilepath, destDir, srcPatternList) {

  var devServerConfigFilepath = (0, _path.resolve)(process.cwd(), relativeDevServerConfigFilepath);

  var sharedReplayEntryListFileStream = createEntryListFile(srcPatternList).shareReplay();

  var publishedWebpackConfigArrayStream = createWebpackConfigArray(sharedReplayEntryListFileStream, devServerConfigFilepath).publish();

  var webpackConfigFilepathByIndexStream = createWebpackConfigFilepathByIndex(publishedWebpackConfigArrayStream);

  var writeToFileResultStream = publishedWebpackConfigArrayStream.map(function (webpackConfigArray) {
    return webpackConfigArray.map(function (_ref3) {
      var webpackConfig = _ref3.webpackConfig;
      return webpackConfig;
    });
  }).tap(_coreIndex.webpackConfigArrayInspector).map(_coreIndex.webpackConfigArrayToWebpackCompiler)
  // Why selectMany? Because devServer just like watch could be repeative.
  // Instead of wrapping one value, now a series of values are emitted.
  .selectMany(_coreIndex.webpackMultiCompilerRunWithDevServerToSingleStatsArray).withLatestFrom(webpackConfigFilepathByIndexStream, _utilIndex.singleStatsArrayAndIndexFilepathMapCombiner).selectMany(function (w) {
    return sharedReplayEntryListFileStream.map(function (e) {
      return (0, _utilIndex.entryListFileAndFilepathWebpackStatsMapCombiner)(e, w);
    });
  }).map(_coreIndex.withOutputAssetsFileToMarkupFile).selectMany((0, _utilIndex.markupFileToWriteFileCreator)(destDir));

  writeToFileResultStream.subscribe(function (it) {
    return console.log("Next: " + it);
  }, function (error) {
    throw error;
  }, function () {
    return console.log("Done!");
  });

  publishedWebpackConfigArrayStream.connect();
}

// Watch

// DevServer

// DevServer