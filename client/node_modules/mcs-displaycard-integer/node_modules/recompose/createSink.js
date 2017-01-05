'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var createSink = function createSink(callback) {
  return (function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      _Component.apply(this, arguments);
    }

    _class.prototype.componentWillMount = function componentWillMount() {
      callback(this.props);
    };

    _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      callback(nextProps);
    };

    _class.prototype.render = function render() {
      return null;
    };

    return _class;
  })(_react.Component);
};

exports['default'] = createSink;
module.exports = exports['default'];