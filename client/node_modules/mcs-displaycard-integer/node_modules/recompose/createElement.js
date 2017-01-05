'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isReferentiallyTransparentFunctionComponent = require('./isReferentiallyTransparentFunctionComponent');

var _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(_isReferentiallyTransparentFunctionComponent);

var createElement = function createElement(Component, props, children) {
  /* eslint-disable */
  var hasKey = props && props.key;
  /* eslint-enable */

  if (!hasKey && _isReferentiallyTransparentFunctionComponent2['default'](Component)) {
    var component = Component;
    if (children) {
      return component(_extends({}, props, { children: children }));
    }
    return component(props);
  }

  if (children) {
    return _react2['default'].createElement(
      Component,
      props,
      children
    );
  }

  return _react2['default'].createElement(Component, props);
};

exports['default'] = createElement;
module.exports = exports['default'];