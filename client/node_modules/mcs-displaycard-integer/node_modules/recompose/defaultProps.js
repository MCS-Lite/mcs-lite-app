'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var defaultProps = function defaultProps(props, BaseComponent) {
  var DefaultProps = function DefaultProps(ownerProps) {
    return _createElement2['default'](BaseComponent, ownerProps);
  };
  DefaultProps.defaultProps = props;
  return DefaultProps;
};

exports['default'] = _createHelper2['default'](defaultProps, 'defaultProps');
module.exports = exports['default'];