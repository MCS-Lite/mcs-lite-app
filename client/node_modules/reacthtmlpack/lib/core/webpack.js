

/**
 * @private
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isEntryType = isEntryType;
exports.entryWithConfigReducer = entryWithConfigReducer;
exports.addEntryListToFile = addEntryListToFile;
exports.webpackConfigEntryReducer = webpackConfigEntryReducer;
exports.entryObjectToWebpackConfig = entryObjectToWebpackConfig;
exports.groupedEntryListToWebpackConfig = groupedEntryListToWebpackConfig;
exports.webpackConfigReducer = webpackConfigReducer;
exports.webpackConfigArrayInspector = webpackConfigArrayInspector;
exports.webpackConfigArrayToWebpackCompiler = webpackConfigArrayToWebpackCompiler;
exports.webpackMultiCompilerToMultiStats = webpackMultiCompilerToMultiStats;
exports.webpackMultiStatsToWebpackSingleStatsArray = webpackMultiStatsToWebpackSingleStatsArray;
exports.entryWithOutputMapper = entryWithOutputMapper;
exports.withOutputAssetsFileToMarkupFile = withOutputAssetsFileToMarkupFile;
exports.webpackCompilerRunWithWatchToSingleStatsWithIndex = webpackCompilerRunWithWatchToSingleStatsWithIndex;
exports.webpackMultiCompilerRunWithDevServerToSingleStatsArray = webpackMultiCompilerRunWithDevServerToSingleStatsArray;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require("path");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require("react-dom/server");

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _rx = require("rx");

var _rx2 = _interopRequireDefault(_rx);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require("webpack-dev-server");

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _entryEntryPropTypeKeyList = require("../entry/entryPropTypeKeyList");

var _entryEntryPropTypeKeyList2 = _interopRequireDefault(_entryEntryPropTypeKeyList);

var _babel = require("./babel");

var _react3 = require("./react");

function isEntryType(type) {
  return _entryEntryPropTypeKeyList2["default"].every(function (key) {
    return type.propTypes && type.propTypes[key];
  });
}

/**
 * @private
 */

function entryWithConfigReducer(children, resolvePathByFile) {
  var acc = [];

  _react.Children.forEach(children, function (child) {
    if (!_react2["default"].isValidElement(child)) {
      return;
    }
    if (isEntryType(child.type)) {
      acc.push({
        id: child.props.configFilepath + "__" + child.props.chunkName,
        chunkName: child.props.chunkName,
        chunkFilepath: [].concat(child.props.chunkFilepath).map(resolvePathByFile),
        configFilepath: resolvePathByFile(child.props.configFilepath)
      });
    }
    acc.push.apply(acc, _toConsumableArray(entryWithConfigReducer(child.props.children, resolvePathByFile)));
  });

  return acc;
}

function addEntryListToFile(file) {
  var resolvePathByFile = function resolvePathByFile(it) {
    return (0, _path.resolve)((0, _path.dirname)(file.filepath), it);
  };

  var entryList = entryWithConfigReducer(file.element.props.children, resolvePathByFile);

  return _extends({}, file, {
    entryList: entryList
  });
}

function webpackConfigEntryReducer(acc, entry) {
  var chunkName = entry.chunkName;
  var chunkFilepath = entry.chunkFilepath;

  if (!acc.entry.hasOwnProperty(chunkName)) {
    acc.entry[chunkName] = chunkFilepath;
  }
  return acc;
}

function entryObjectToWebpackConfig(acc) {
  var webpackConfigFilepath = acc.webpackConfigFilepath;
  var entry = acc.entry;

  return (0, _babel.transformFile)(webpackConfigFilepath).map(function (_ref) {
    var code = _ref.code;

    var WebpackConfigModule = (0, _react3.evaluateAsES2015Module)(code, webpackConfigFilepath);
    var webpackConfig = WebpackConfigModule["default"];

    return {
      webpackConfigFilepath: webpackConfigFilepath,
      webpackConfig: _extends({}, webpackConfig, {
        entry: _extends({}, webpackConfig.reacthtmlpackExtraEntry, entry)
      })
    };
  });
}

function groupedEntryListToWebpackConfig(groupedEntryList) {
  // http://requirebin.com/?gist=fe2c7d8fe7083d8bcd2d
  var webpackConfigFilepath = groupedEntryList.key;

  return groupedEntryList.reduce(webpackConfigEntryReducer, {
    webpackConfigFilepath: webpackConfigFilepath,
    entry: {}
  }).selectMany(entryObjectToWebpackConfig);
}

function webpackConfigReducer(webpackConfigArray, webpackConfig) {
  // Your Client config should always be first
  if (webpackConfig.reacthtmlpackDevServer) {
    return [webpackConfig].concat(webpackConfigArray);
  } else {
    return webpackConfigArray.concat(webpackConfig);
  }
}

function webpackConfigArrayInspector(webpackConfigArray) {
  var notMultipleConfig = 2 > webpackConfigArray.length;
  if (notMultipleConfig) {
    return;
  }

  var _webpackConfigArray = _slicedToArray(webpackConfigArray, 1);

  var _webpackConfigArray$0 = _webpackConfigArray[0];
  var reacthtmlpackDevServer = _webpackConfigArray$0.reacthtmlpackDevServer;
  var outputPath = _webpackConfigArray$0.output.path;

  var notInDevServerMode = !reacthtmlpackDevServer;
  if (notInDevServerMode) {
    return;
  }
  // In devServer command, you have to keep all output.path the same.
  var theyDontHaveTheSameOutputPath = webpackConfigArray.some(function (it) {
    return it.output.path !== outputPath;
  });
  if (theyDontHaveTheSameOutputPath) {
    var message = "Some of your output.path is different than others in \nall of your webpack config files. This may cause unexpected behaviour when \nusing them with webpack-dev-server. The base path serving your assets may \nchange according to these commits:\n0. https://github.com/webpack/webpack-dev-server/blob/f6b3bcb4a349540176bacc86df0df8e4109d0e3f/lib/Server.js#L53\n1. https://github.com/webpack/webpack-dev-middleware/blob/42e5778f44939cd45fedd36d7b201b3eeb357630/middleware.js#L140\n2. https://github.com/webpack/webpack/blob/8ff6cb5fedfc487665bb5dd8ecedf5d4ea306b51/lib/MultiCompiler.js#L51-L63\nrequest goes from webpack-dev-server (0.) > webpack-dev-middleware (1.) > webpack/MultiCompiler (2.)";

    console.warn(message);
  }
}

function webpackConfigArrayToWebpackCompiler(webpackConfigArray) {
  return (0, _webpack2["default"])(webpackConfigArray);
}

function webpackMultiCompilerToMultiStats(webpackMultiCompiler) {
  return _rx.Observable.fromNodeCallback(webpackMultiCompiler.run.bind(webpackMultiCompiler))();
}

function webpackMultiStatsToWebpackSingleStatsArray(webpackMultiStats) {
  // See MultiCompiler - MultiStats
  return webpackMultiStats.stats.map(function (stats) {
    return { stats: stats, statsJson: stats.toJson() };
  });
}

function entryWithOutputMapper(children, outputAssetListById) {
  return _react.Children.map(children, function (child) {
    if (!_react2["default"].isValidElement(child)) {
      return child;
    }
    var extraProps = {
      children: entryWithOutputMapper(child.props.children, outputAssetListById)
    };

    if (isEntryType(child.type)) {
      var _id = child.props.configFilepath + "__" + child.props.chunkName;
      extraProps.outputAssetList = outputAssetListById[_id];
    }

    return _react2["default"].cloneElement(child, extraProps);
  });
}

function withOutputAssetsFileToMarkupFile(withOutputAssetsFile) {
  var clonedElement = _react2["default"].cloneElement(withOutputAssetsFile.element, {
    children: entryWithOutputMapper(withOutputAssetsFile.element.props.children, withOutputAssetsFile.outputAssetListById)
  });

  var reactHtmlMarkup = _reactDomServer2["default"].renderToStaticMarkup(clonedElement);
  var markup = "" + withOutputAssetsFile.doctypeHTML + reactHtmlMarkup;

  return {
    relativePath: withOutputAssetsFile.relativePath,
    markup: markup
  };
}

function webpackCompilerRunWithWatchToSingleStatsWithIndex(webpackCompiler, index) {
  return _rx.Observable.create(function (observer) {
    function callback(err, stats) {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext({
          index: index,
          stats: stats,
          statsJson: stats.toJson()
        });
      }
    }

    var watcher = webpackCompiler.watch({}, callback);
    return function () {
      watcher.close();
    };
  });
}

function webpackMultiCompilerRunWithDevServerToSingleStatsArray(webpackMultiCompiler) {
  var _webpackMultiCompiler$compilers$filter$map = webpackMultiCompiler.compilers.filter(function (compiler) {
    return compiler.options.reacthtmlpackDevServer;
  }).map(function (compiler) {
    return compiler.options.devServer;
  });

  var _webpackMultiCompiler$compilers$filter$map2 = _slicedToArray(_webpackMultiCompiler$compilers$filter$map, 1);

  var devServer = _webpackMultiCompiler$compilers$filter$map2[0];

  var wDS = new _webpackDevServer2["default"](webpackMultiCompiler, devServer);

  return _rx.Observable.create(function (observer) {
    wDS.listen(devServer.port, devServer.host, function (err) {
      if (err) {
        observer.onError(err);
      }
    });

    webpackMultiCompiler.plugin("done", function (webpackMultiStats) {
      observer.onNext(webpackMultiStats.stats.map(function (stats) {
        return { stats: stats, statsJson: stats.toJson() };
      }));
    });
  });
}