"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index");

describe("entry", function () {
  describe("index", function () {
    it("should be exported", function () {
      (0, _expect2["default"])(_index.WebpackNullEntry).toExist();
      (0, _expect2["default"])(_index.WebpackScriptEntry).toExist();
      (0, _expect2["default"])(_index.WebpackStyleEntry).toExist();
      (0, _expect2["default"])(_index.ReactRenderToStringEntry).toExist();
    });
  });
});