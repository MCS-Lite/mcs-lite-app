"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGlobResult = createGlobResult;
exports.globResultToFile = globResultToFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _glob = require("glob");

var _glob2base = require("glob2base");

var _glob2base2 = _interopRequireDefault(_glob2base);

var _rx = require("rx");

var _rx2 = _interopRequireDefault(_rx);

function createGlobResult(pattern) {
  var globber = new _glob.Glob(pattern);
  var base = (0, _glob2base2["default"])(globber);

  return _rx2["default"].Observable.create(function (observer) {
    function callback(matches) {
      observer.onNext({
        base: base,
        matches: matches
      });
      observer.onCompleted();
    };

    globber.once("end", callback);
    globber.on("error", observer.onError);

    return function () {
      globber.removeListener("end", callback);
      globber.removeListener("error", observer.onError);
    };
  });
}

function globResultToFile(globResult) {
  return _rx.Observable.fromArray(globResult.matches).map(function (filepath) {
    return {
      filepath: filepath,
      relativePath: (0, _path.relative)(globResult.base, filepath)
    };
  });
}