'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var hoistStatics = function hoistStatics(higherOrderComponent) {
  return function (BaseComponent) {
    var NewComponent = higherOrderComponent(BaseComponent);
    _hoistNonReactStatics2['default'](NewComponent, BaseComponent);
    return NewComponent;
  };
};

exports['default'] = hoistStatics;
module.exports = exports['default'];