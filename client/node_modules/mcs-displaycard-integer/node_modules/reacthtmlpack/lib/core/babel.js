

// Note babel-core/index.js is NOT a ES6 module
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addCodeToFile = addCodeToFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _rx = require("rx");

var _rx2 = _interopRequireDefault(_rx);

var babel = require("babel-core");

var transformFile = _rx.Observable.fromNodeCallback(babel.transformFile);

exports.transformFile = transformFile;

function addCodeToFile(file) {
  return transformFile(file.filepath).map(function (_ref) {
    var code = _ref.code;
    return _extends({}, file, {
      code: code
    });
  });
}