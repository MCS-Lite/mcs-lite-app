'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var withContext = function withContext(childContextTypes, getChildContext, BaseComponent) {
  var WithContext = (function (_Component) {
    _inherits(WithContext, _Component);

    function WithContext() {
      var _this = this;

      _classCallCheck(this, WithContext);

      _Component.apply(this, arguments);

      this.getChildContext = function () {
        return getChildContext(_this.props);
      };
    }

    WithContext.prototype.render = function render() {
      return _createElement2['default'](BaseComponent, this.props);
    };

    return WithContext;
  })(_react.Component);

  WithContext.childContextTypes = childContextTypes;

  return WithContext;
};

exports['default'] = _createHelper2['default'](withContext, 'withContext');
module.exports = exports['default'];