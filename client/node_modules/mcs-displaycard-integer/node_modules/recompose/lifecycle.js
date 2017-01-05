'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var lifecycle = function lifecycle(setup, teardown, BaseComponent) {
  return (function (_React$Component) {
    _inherits(Lifecycle, _React$Component);

    function Lifecycle(props, context) {
      _classCallCheck(this, Lifecycle);

      _React$Component.call(this, props, context);
      if (setup) {
        setup(this);
      }
    }

    Lifecycle.prototype.componentWillUnmount = function componentWillUnmount() {
      if (teardown) {
        teardown(this);
      }
    };

    Lifecycle.prototype.render = function render() {
      return _createElement2['default'](BaseComponent, _extends({}, this.props, this.state));
    };

    return Lifecycle;
  })(_react2['default'].Component);
};

exports['default'] = _createHelper2['default'](lifecycle, 'lifecycle');
module.exports = exports['default'];