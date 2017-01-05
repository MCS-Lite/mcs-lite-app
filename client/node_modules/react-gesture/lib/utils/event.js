"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGestureData = initGestureData;
exports.getEventGesture = getEventGesture;
exports.setEventPinch = setEventPinch;
exports.setGestureType = setGestureType;
exports.setGestureScrollDelta = setGestureScrollDelta;
exports.setEvGestureDetailsPos = setEvGestureDetailsPos;
exports.setEvGestureIsFlick = setEvGestureIsFlick;

var LINE_HEIGHT = 20;

function getScrollDelta(e) {
  return e.deltaY * (e.deltaMode ? LINE_HEIGHT : 1);
}

function initGestureData(e, deltaX, deltaY, absX, absY, velocity, velocityX, velocityY, duration, done) {
  e.gesture = {
    deltaX: deltaX,
    deltaY: deltaY,
    absX: absX,
    absY: absY,
    velocity: velocity,
    velocityX: velocityX,
    velocityY: velocityY,
    duration: duration,
    done: done
  };
}

function getEventGesture(e) {
  return e.gesture;
}

function setEventPinch(e, scale, origin) {
  e.pinch = {
    scale: scale,
    origin: origin
  };
}

function setGestureType(eventWithGesture, gestureType) {
  eventWithGesture.gesture.type = gestureType;
}

function setGestureScrollDelta(eventWithGesture, e) {
  eventWithGesture.gesture.scrollDelta = getScrollDelta(e);
}

function setEvGestureDetailsPos(eventWithGesture, clientX, clientY) {
  eventWithGesture.clientX = clientX;
  eventWithGesture.clientY = clientY;
}

function setEvGestureIsFlick(eventGesture, isFlick) {
  eventGesture.isFlick = isFlick;
}