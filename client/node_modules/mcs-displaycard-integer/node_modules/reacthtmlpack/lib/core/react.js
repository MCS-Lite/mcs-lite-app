"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.evaluateAsES2015Module = evaluateAsES2015Module;
exports.addElementToFile = addElementToFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _evalAsModule = require("eval-as-module");

var _evalAsModule2 = _interopRequireDefault(_evalAsModule);

function evaluateAsES2015Module(code, filepath) {
  var cjsModule = (0, _evalAsModule2["default"])(code, filepath);
  if (cjsModule.exports && cjsModule.__esModule) {
    return cjsModule.exports;
  } else {
    return {
      "default": cjsModule.exports
    };
  };
}

function addElementToFile(file) {
  var module = evaluateAsES2015Module(file.code, file.filepath);
  var element = module["default"];
  var doctypeHTML = "undefined" !== typeof module.doctypeHTML ? module.doctypeHTML : "<!DOCTYPE html>";

  return _extends({}, file, {
    element: element,
    doctypeHTML: doctypeHTML
  });
}