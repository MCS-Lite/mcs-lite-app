'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.touchListMap = touchListMap;
exports.distance = distance;
exports.getDirection = getDirection;

var _directionTypes = require('../constants/direction-types');

function getXY(touch) {
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}

function touchListMap(list) {
  var result = [];
  var listLength = list.length;
  for (var i = 0; i < listLength; i += 1) {
    result.push(getXY(list[i]));
  }
  return result;
}

function distance(points) {
  var x = arguments.length <= 1 || arguments[1] === undefined ? 'x' : arguments[1];
  var y = arguments.length <= 2 || arguments[2] === undefined ? 'y' : arguments[2];

  var firstPoint = points[1];
  var zeroPoint = points[0];
  var dX = firstPoint[x] - zeroPoint[x];
  var dY = firstPoint[y] - zeroPoint[y];
  return Math.sqrt(dX * dX + dY * dY);
}

function getDirectionX(deltaX) {
  return deltaX < 0 ? _directionTypes.Right : _directionTypes.Left;
}

function getDirectionY(deltaY) {
  return deltaY < 0 ? _directionTypes.Down : _directionTypes.Up;
}

function getDirection(deltaX, absX, deltaY, absY) {
  return absX > absY ? getDirectionX(deltaX) : getDirectionY(deltaY);
}