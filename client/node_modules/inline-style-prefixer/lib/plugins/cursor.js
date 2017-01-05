'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var values = ['zoom-in', 'zoom-out', 'grab', 'grabbing'];

exports['default'] = function (property, value, _ref2) {
  var browser = _ref2.browser;
  var version = _ref2.version;
  var prefix = _ref2.prefix;

  if (property === 'cursor' && values.indexOf(value) > -1 && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    return _defineProperty({}, property, prefix.CSS + value);
  }
};

module.exports = exports['default'];