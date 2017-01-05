"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

var _index = require("../index");

var _ScriptjsLoader = require("./ScriptjsLoader");

var _ScriptjsLoader2 = _interopRequireDefault(_ScriptjsLoader);

var ScriptjsGoogleMap = (function (_Component) {
  _inherits(ScriptjsGoogleMap, _Component);

  function ScriptjsGoogleMap() {
    _classCallCheck(this, ScriptjsGoogleMap);

    _get(Object.getPrototypeOf(ScriptjsGoogleMap.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(ScriptjsGoogleMap, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _warning2["default"])(false, "\"async/ScriptjsGoogleMap\" is deprecated now and will be removed in next major release (5.0.0). Use \"async/ScriptjsLoader\" instead.\nSee https://github.com/tomchentw/react-google-maps/pull/150 for more details.");
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var protocol = _props.protocol;
      var hostname = _props.hostname;
      var port = _props.port;
      var pathname = _props.pathname;
      var query = _props.query;
      var loadingElement = _props.loadingElement;
      var children = _props.children;

      var restProps = _objectWithoutProperties(_props, ["protocol", "hostname", "port", "pathname", "query", "loadingElement", "children"]);

      return _react2["default"].createElement(_ScriptjsLoader2["default"], {
        protocol: protocol,
        hostname: hostname,
        port: port,
        pathname: pathname,
        query: query,
        loadingElement: loadingElement,
        googleMapElement: _react2["default"].createElement(
          _index.GoogleMap,
          restProps,
          children
        )
      });
    }
  }]);

  return ScriptjsGoogleMap;
})(_react.Component);

exports["default"] = ScriptjsGoogleMap;
module.exports = exports["default"];