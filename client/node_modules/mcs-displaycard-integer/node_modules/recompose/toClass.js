'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _isClassComponent = require('./isClassComponent');

var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

var toClass = function toClass(baseComponent) {
  if (_isClassComponent2['default'](baseComponent)) {
    return baseComponent;
  }

  var ToClass = (function (_Component) {
    _inherits(ToClass, _Component);

    function ToClass() {
      _classCallCheck(this, ToClass);

      _Component.apply(this, arguments);
    }

    ToClass.prototype.render = function render() {
      if (typeof baseComponent === 'string') {
        return _react2['default'].createElement('baseComponent', this.props);
      }
      return baseComponent(this.props, this.context);
    };

    return ToClass;
  })(_react.Component);

  ToClass.displayName = _getDisplayName2['default'](baseComponent);
  ToClass.propTypes = baseComponent.propTypes;
  ToClass.contextTypes = baseComponent.contextTypes;
  ToClass.defaultProps = baseComponent.defaultProps;

  return ToClass;
};

exports['default'] = toClass;
module.exports = exports['default'];