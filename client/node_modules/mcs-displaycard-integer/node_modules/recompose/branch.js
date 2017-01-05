'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var branch = function branch(test, left, right, BaseComponent) {
  return (function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props, context) {
      _classCallCheck(this, _class);

      _React$Component.call(this, props, context);
      this.LeftComponent = null;
      this.RightComponent = null;
      this.computeChildComponent(this.props);
    }

    _class.prototype.computeChildComponent = function computeChildComponent(props) {
      if (test(props)) {
        this.LeftComponent = this.LeftComponent || left(BaseComponent);
        this.Component = this.LeftComponent;
      } else {
        this.RightComponent = this.RightComponent || right(BaseComponent);
        this.Component = this.RightComponent;
      }
    };

    _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      this.computeChildComponent(nextProps);
    };

    _class.prototype.render = function render() {
      var Component = this.Component;

      return _createElement2['default'](Component, this.props);
    };

    return _class;
  })(_react2['default'].Component);
};

exports['default'] = _createHelper2['default'](branch, 'branch');
module.exports = exports['default'];