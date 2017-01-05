'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var getContext = function getContext(contextTypes, BaseComponent) {
  var GetContext = function GetContext(ownerProps, context) {
    return _createElement2['default'](BaseComponent, _extends({}, ownerProps, context));
  };

  GetContext.contextTypes = contextTypes;

  return GetContext;
};

exports['default'] = _createHelper2['default'](getContext, 'getContext');
module.exports = exports['default'];