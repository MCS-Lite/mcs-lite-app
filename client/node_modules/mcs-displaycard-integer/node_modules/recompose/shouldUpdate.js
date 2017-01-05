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

var shouldUpdate = function shouldUpdate(test, BaseComponent) {
  return (function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      _Component.apply(this, arguments);
    }

    _class.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return test(this.props, nextProps);
    };

    _class.prototype.render = function render() {
      return _createElement2['default'](BaseComponent, this.props);
    };

    return _class;
  })(_react.Component);
};

exports['default'] = _createHelper2['default'](shouldUpdate, 'shouldUpdate');
module.exports = exports['default'];