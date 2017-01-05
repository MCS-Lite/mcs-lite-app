/* eslint space-infix-ops:0, no-param-reassign:0 */
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
// no easing, no acceleration
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = linear;
exports.easeInQuad = easeInQuad;
exports.easeOutQuad = easeOutQuad;
exports.easeInOutQuad = easeInOutQuad;
exports.easeInCubic = easeInCubic;
exports.easeOutCubic = easeOutCubic;
exports.easeInOutCubic = easeInOutCubic;
exports.easeInQuart = easeInQuart;
exports.easeOutQuart = easeOutQuart;
exports.easeInOutQuart = easeInOutQuart;
exports.easeInQuint = easeInQuint;
exports.easeOutQuint = easeOutQuint;
exports.easeInOutQuint = easeInOutQuint;

function linear(t) {
  return t;
}

// accelerating from zero velocity

function easeInQuad(t) {
  return t * t;
}

// decelerating to zero velocity

function easeOutQuad(t) {
  return t * (2 - t);
}

// acceleration until halfway, then deceleration

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// accelerating from zero velocity

function easeInCubic(t) {
  return t * t * t;
}

// decelerating to zero velocity

function easeOutCubic(t) {
  return --t * t * t + 1;
}

// acceleration until halfway, then deceleration

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// accelerating from zero velocity

function easeInQuart(t) {
  return t * t * t * t;
}

// decelerating to zero velocity

function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}

// acceleration until halfway, then deceleration

function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

// accelerating from zero velocity

function easeInQuint(t) {
  return t * t * t * t * t;
}

// decelerating to zero velocity

function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}

// acceleration until halfway, then deceleration

function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}