'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var renderNothing = function renderNothing(_) {
  var Nothing = function Nothing() {
    return null;
  };
  Nothing.displayName = 'Nothing';
  return Nothing;
};

exports['default'] = _createHelper2['default'](renderNothing, 'renderNothing', 1, false);
module.exports = exports['default'];