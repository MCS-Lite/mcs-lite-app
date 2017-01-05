'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var setStatic = function setStatic(key, value, BaseComponent) {
  BaseComponent[key] = value;
  return BaseComponent;
};

exports['default'] = _createHelper2['default'](setStatic, 'setStatic', 3, false);
module.exports = exports['default'];