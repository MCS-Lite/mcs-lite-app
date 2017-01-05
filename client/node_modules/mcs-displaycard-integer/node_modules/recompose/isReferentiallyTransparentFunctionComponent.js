'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isClassComponentJs = require('./isClassComponent.js');

var _isClassComponentJs2 = _interopRequireDefault(_isClassComponentJs);

var isReferentiallyTransparentFunctionComponent = function isReferentiallyTransparentFunctionComponent(Component) {
  return Boolean(typeof Component === 'function' && !_isClassComponentJs2['default'](Component) && !Component.defaultProps && !Component.contextTypes && !Component.propTypes);
};

exports['default'] = isReferentiallyTransparentFunctionComponent;
module.exports = exports['default'];