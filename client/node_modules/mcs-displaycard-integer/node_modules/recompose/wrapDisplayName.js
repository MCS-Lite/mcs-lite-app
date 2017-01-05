'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + _getDisplayName2['default'](BaseComponent) + ')';
};

exports['default'] = wrapDisplayName;
module.exports = exports['default'];