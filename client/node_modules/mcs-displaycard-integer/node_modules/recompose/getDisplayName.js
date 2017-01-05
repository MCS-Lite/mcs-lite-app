'use strict';

exports.__esModule = true;
var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }
  return Component.displayName || Component.name || 'Component';
};

exports['default'] = getDisplayName;
module.exports = exports['default'];