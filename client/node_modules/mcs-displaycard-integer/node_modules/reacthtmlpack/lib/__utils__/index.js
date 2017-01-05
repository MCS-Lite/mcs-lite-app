"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileAsContent = readFileAsContent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function readFileAsContent(filepath) {
  return _fs2["default"].readFileSync(filepath, "utf8").trim(); // trim to remove the newline before EOF
}