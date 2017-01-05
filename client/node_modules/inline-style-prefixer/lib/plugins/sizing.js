'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var properties = ['maxHeight', 'maxWidth', 'width', 'height', 'columnWidth', 'minWidth', 'minHeight'];
var values = ['min-content', 'max-content', 'fill-available', 'fit-content', 'contain-floats'];

exports['default'] = function (property, value, _ref2) {
  var prefix = _ref2.prefix;

  /**
   * This actually is only available with prefixes
   * NOTE: This might change in the feature
   */
  if (properties.indexOf(property) > -1 && values.indexOf(value) > -1) {
    return _defineProperty({}, property, prefix.CSS + value);
  }
};

module.exports = exports['default'];