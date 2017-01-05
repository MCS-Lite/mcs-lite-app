'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var renderComponent = function renderComponent(Component, _) {
  return function (props) {
    return _createElement2['default'](Component, props);
  };
};

exports['default'] = _createHelper2['default'](renderComponent, 'renderComponent');
module.exports = exports['default'];