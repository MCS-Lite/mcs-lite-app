'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pluginsCursor = require('./plugins/cursor');

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = require('./plugins/flex');

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = require('./plugins/sizing');

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = require('./plugins/gradient');

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

// special flexbox specifications

var _pluginsFlexboxIE = require('./plugins/flexboxIE');

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = require('./plugins/flexboxOld');

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

exports['default'] = [_pluginsCursor2['default'], _pluginsFlex2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default']];
module.exports = exports['default'];