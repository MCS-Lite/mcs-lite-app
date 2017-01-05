'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _setStatic = require('./setStatic');

var _setStatic2 = _interopRequireDefault(_setStatic);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var setDisplayName = _setStatic2['default']('displayName');

exports['default'] = _createHelper2['default'](setDisplayName, 'setDisplayName', 2, false);
module.exports = exports['default'];