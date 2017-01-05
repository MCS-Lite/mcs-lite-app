'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MorphTransition2 = require('./MorphTransition');

var _MorphTransition3 = _interopRequireDefault(_MorphTransition2);

var _ReactNativeART = require('ReactNativeART');

var MorphTransitionNative = (function (_MorphTransition) {
    _inherits(MorphTransitionNative, _MorphTransition);

    function MorphTransitionNative() {
        _classCallCheck(this, MorphTransitionNative);

        _get(Object.getPrototypeOf(MorphTransitionNative.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MorphTransitionNative, [{
        key: 'render',
        value: function render() {
            var width = this.props.width;
            var height = this.props.height;
            return _react2['default'].createElement(
                _ReactNativeART.Surface,
                _extends({ width: width, height: height, style: { width: width, height: height } }, this.props),
                this.state.current.map(function (item, index) {
                    var rotate = item.trans.rotate;
                    var transform = new _ReactNativeART.Transform().rotate(rotate[0], rotate[1], rotate[2]);
                    return _react2['default'].createElement(_ReactNativeART.Shape, _extends({ style: item.style, d: item.path, fill: '#000000' }, item.attrs, { transform: transform, key: index }));
                })
            );
        }
    }]);

    return MorphTransitionNative;
})(_MorphTransition3['default']);

exports['default'] = MorphTransitionNative;
module.exports = exports['default'];