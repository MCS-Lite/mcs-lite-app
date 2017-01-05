'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MorphTransition2 = require('./MorphTransition');

var _MorphTransition3 = _interopRequireDefault(_MorphTransition2);

var _utilsScalePath = require('./utils/scalePath');

var _utilsScalePath2 = _interopRequireDefault(_utilsScalePath);

var MorphTransitionResize = (function (_MorphTransition) {
    _inherits(MorphTransitionResize, _MorphTransition);

    function MorphTransitionResize(props) {
        _classCallCheck(this, MorphTransitionResize);

        _get(Object.getPrototypeOf(MorphTransitionResize.prototype), 'constructor', this).call(this, props);
    }

    _createClass(MorphTransitionResize, [{
        key: 'getSvgInfo',
        value: function getSvgInfo(child) {
            var key = child.key;
            if (this.svgCache[key]) {
                return this.svgCache[key];
            }
            var svg = _get(Object.getPrototypeOf(MorphTransitionResize.prototype), 'getSvgInfo', this).call(this, child);
            // reset viewBox
            this.viewBox = [0, 0, this.props.width, this.props.height].join(' ');
            var width = undefined,
                height = undefined;
            var base = this.props.height > this.props.width ? this.props.height : this.props.width;

            var viewBox = svg.viewBox;
            if (!viewBox) {
                width = svg.width;
                height = svg.height;
            } else {
                viewBox = viewBox.split(' ');
                height = viewBox[3];
                width = viewBox[2];
            }
            svg.paths.map(function (item) {
                item.path = (0, _utilsScalePath2['default'])(item.path, base, width, height);
                return item;
            });
            this.svgCache[key] = svg;
            return svg;
        }
    }]);

    return MorphTransitionResize;
})(_MorphTransition3['default']);

exports['default'] = MorphTransitionResize;
module.exports = exports['default'];