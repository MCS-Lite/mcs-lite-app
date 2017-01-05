"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _ReactPropTypeLocations = require("react/lib/ReactPropTypeLocations");

var _ReactPropTypeLocations2 = _interopRequireDefault(_ReactPropTypeLocations);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable prefer-arrow-callback */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */


describe("propTypesElementOfType", function describePropTypesElementOfType() {
  var domEl = void 0;
  var ChildComponent = void 0;
  var WrapperComponent = void 0;
  var consoleErrorSpy = void 0;

  beforeEach(function beforeEachPropTypesElementOfType() {
    domEl = document.createElement("div");

    ChildComponent = function (_Component) {
      _inherits(C, _Component);

      function C() {
        _classCallCheck(this, C);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(C).apply(this, arguments));
      }

      _createClass(C, [{
        key: "render",
        value: function render() {
          return _react2.default.createElement(
            "div",
            null,
            "Child"
          );
        }
      }]);

      return C;
    }(_react.Component);

    /* eslint-disable react/prefer-es6-class */
    WrapperComponent = _react2.default.createClass({
      displayName: "WrapperComponent",

      propTypes: {
        childElement: (0, _index2.default)(ChildComponent).isRequired
      },

      render: function render() {
        return _react2.default.createElement(
          "div",
          null,
          this.props.childElement
        );
      }
    });
    /* eslint-enable react/prefer-es6-class */

    consoleErrorSpy = _expect2.default.spyOn(console, "error");
  });

  afterEach(function bafterEachPropTypesElementOfType() {
    consoleErrorSpy.restore();
    (0, _reactDom.unmountComponentAtNode)(domEl);
    domEl = null;
  });

  it("should warn for invalid element", function it() {
    (0, _reactDom.render)(_react2.default.createElement(WrapperComponent, { childElement: _react2.default.createElement("div", null) }), domEl);

    (0, _expect2.default)(consoleErrorSpy.calls.length).toBe(1);
  });

  it("should warn when passing no element and isRequired is set", function it() {
    (0, _reactDom.render)(_react2.default.createElement(WrapperComponent, null), domEl);

    (0, _expect2.default)(consoleErrorSpy.calls.length).toBe(1);
  });

  it("should not warn for valid element", function it() {
    (0, _reactDom.render)(_react2.default.createElement(WrapperComponent, { childElement: _react2.default.createElement(ChildComponent, null) }), domEl);

    (0, _expect2.default)(consoleErrorSpy.calls.length).toBe(0);
  });

  it("should be implicitly optional and not warn without values", function it() {
    typeCheckPass((0, _index2.default)(ChildComponent), null);
    typeCheckPass((0, _index2.default)(ChildComponent), undefined);
  });

  describe("component inheritance", function describeComponentInheritance() {
    it("should warn that", function it() {
      var XGrandChildComponent = function (_ChildComponent) {
        _inherits(XGrandChildComponent, _ChildComponent);

        function XGrandChildComponent() {
          _classCallCheck(this, XGrandChildComponent);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(XGrandChildComponent).apply(this, arguments));
        }

        _createClass(XGrandChildComponent, [{
          key: "render",
          value: function render() {
            return _react2.default.createElement(
              "div",
              null,
              "GrandChild"
            );
          }
        }]);

        return XGrandChildComponent;
      }(ChildComponent);

      (0, _reactDom.render)(_react2.default.createElement(WrapperComponent, { childElement: _react2.default.createElement(XGrandChildComponent, null) }), domEl);

      (0, _expect2.default)(consoleErrorSpy.calls.length).toBe(1);
    });

    it("should contains message that points back to GitHub issue thread", function it() {
      var YGrandChildComponent = function (_ChildComponent2) {
        _inherits(YGrandChildComponent, _ChildComponent2);

        function YGrandChildComponent() {
          _classCallCheck(this, YGrandChildComponent);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(YGrandChildComponent).apply(this, arguments));
        }

        _createClass(YGrandChildComponent, [{
          key: "render",
          value: function render() {
            return _react2.default.createElement(
              "div",
              null,
              "GrandChild"
            );
          }
        }]);

        return YGrandChildComponent;
      }(ChildComponent);

      (0, _reactDom.render)(_react2.default.createElement(WrapperComponent, { childElement: _react2.default.createElement(YGrandChildComponent, null) }), domEl);

      (0, _expect2.default)(consoleErrorSpy.calls[0].arguments[0]).toInclude("facebook/react/pull/4716");
    });
  });
});

// copy from facebook/react@0.14-stable: http://git.io/v4pv5
function typeCheckPass(declaration, value) {
  var props = { testProp: value };
  var error = declaration(props, "testProp", "testComponent", _ReactPropTypeLocations2.default.prop);
  (0, _expect2.default)(error).toBe(null);
}