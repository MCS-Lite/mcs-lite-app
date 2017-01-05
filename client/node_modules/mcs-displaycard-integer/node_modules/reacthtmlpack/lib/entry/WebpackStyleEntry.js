"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _fbjsLibInvariant = require("fbjs/lib/invariant");

var _fbjsLibInvariant2 = _interopRequireDefault(_fbjsLibInvariant);

var WebpackStyleEntry = (function (_Component) {
  _inherits(WebpackStyleEntry, _Component);

  function WebpackStyleEntry() {
    _classCallCheck(this, WebpackStyleEntry);

    _get(Object.getPrototypeOf(WebpackStyleEntry.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(WebpackStyleEntry, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var chunkName = _props.chunkName;
      var chunkFilepath = _props.chunkFilepath;
      var configFilepath = _props.configFilepath;
      var outputAssetList = _props.outputAssetList;

      var restProps = _objectWithoutProperties(_props, ["chunkName", "chunkFilepath", "configFilepath", "outputAssetList"]);

      if (outputAssetList) {
        (0, _fbjsLibInvariant2["default"])(0 < outputAssetList.length, "[WebpackStyleEntry] outputAssetList is an empty array");

        var cssAssetList = outputAssetList.filter(function (_ref) {
          var publicFilepath = _ref.publicFilepath;

          (0, _fbjsLibInvariant2["default"])("string" === typeof publicFilepath, "[WebpackStyleEntry] publicFilepath (%s) is not a string", publicFilepath);

          return (/\.css$/.test(publicFilepath)
          );
        });

        if (0 < cssAssetList.length) {
          var firstAsset = cssAssetList[0];
          return _react2["default"].createElement("link", _extends({}, restProps, { rel: "stylesheet", href: firstAsset.publicFilepath }));
        }
      }
      return _react2["default"].createElement("noscript", null);
    }
  }], [{
    key: "propTypes",
    value: {
      chunkName: _react.PropTypes.string.isRequired,
      chunkFilepath: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
      configFilepath: _react.PropTypes.string.isRequired,
      // Generated later.
      outputAssetList: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        publicFilepath: _react.PropTypes.string.isRequired
      }))
    },
    enumerable: true
  }]);

  return WebpackStyleEntry;
})(_react.Component);

exports["default"] = WebpackStyleEntry;
module.exports = exports["default"];