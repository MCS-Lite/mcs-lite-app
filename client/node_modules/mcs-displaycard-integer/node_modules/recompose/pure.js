'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shouldUpdate = require('./shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var pure = _shouldUpdate2['default'](function (props, nextProps) {
  return !_shallowEqual2['default'](props, nextProps);
});

exports['default'] = _createHelper2['default'](pure, 'pure', 1);
module.exports = exports['default'];