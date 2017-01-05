'use strict';

jest.dontMock('../applyMediaQueries');
jest.dontMock('react/lib/Object.assign');

describe('applyMediaQueries', function() {

  it ('should attach a visibilityChange listener', function() {
    document.visibilityState = true;
    var applyMediaQueries = require('../applyMediaQueries');
    var registeredMediaQueries = [];
    var origCall = document.addEventListener;
    var isCalled = false;
    document.addEventListener = function(event){
      if (event === 'visibilitychange') {
        isCalled = true;
      }
    };
    var styleSheet = {a:{backgroundColor:'blue'}};
    applyMediaQueries(registeredMediaQueries, styleSheet, false);
    expect(isCalled).toBe(true);
    document.addEventListener = origCall;
  });

  it ('should return a new stylesheet', function() {
    var applyMediaQueries = require('../applyMediaQueries');
    var registeredMediaQueries = [];
    var styleSheet = {a:{backgroundColor:'blue'}};
    var newStyleSheet = applyMediaQueries(registeredMediaQueries, styleSheet, false);
    expect(styleSheet).not.toBe(newStyleSheet);
    expect(styleSheet.a).toBe(newStyleSheet.a);
  });

  it ('should apply valid media queries', function() {
    window.matchMedia = function() {
      return {
        matches: true
      };
    };
    var applyMediaQueries = require('../applyMediaQueries');
    var registeredMediaQueries = [];
    var styleSheet = {a:{backgroundColor:'blue'}, '@media foo': {a:{backgroundColor: 'yellow'}}};
    var newStyleSheet = applyMediaQueries(registeredMediaQueries, styleSheet, false);
    expect(newStyleSheet.a.backgroundColor).toBe('yellow');
  });

  it ('should not apply invalid media queries', function() {
    window.matchMedia = function() {
      return {
        matches: false
      };
    };
    var applyMediaQueries = require('../applyMediaQueries');
    var registeredMediaQueries = [];
    var styleSheet = {a:{backgroundColor:'blue'}, '@media foo': {a:{backgroundColor: 'yellow'}}};
    var newStyleSheet = applyMediaQueries(registeredMediaQueries, styleSheet, false);
    expect(newStyleSheet.a.backgroundColor).toBe('blue');
  });

  it ('should warn when trying to apply mediaQueries to an undefined block', function() {
    window.matchMedia = function() {
      return {
        matches: true
      };
    };
    var applyMediaQueries = require('../applyMediaQueries');
    var origCall = console.warn;
    var _msg;

    console.warn = function(msg) {
      _msg = msg;
    };

    var registeredMediaQueries = [];
    var styleSheet2 = {d:{backgroundColor:'blue'}, '@media foo2': {d2:{backgroundColor: 'yellow'}}};
    applyMediaQueries(registeredMediaQueries, styleSheet2, false);
    expect(_msg).toBe('Media query \'@media foo2\' referred to undeclared style block \'d2\'.')
    console.warn = origCall;
  });

  it ('should register media queries', function() {
    window.matchMedia = function() {
      return {
        matches: true,
        addListener:function(){}
      };
    };
    var applyMediaQueries = require('../applyMediaQueries');
    var registeredMediaQueries = [];
    var styleSheet2 = {d:{backgroundColor:'blue'}, '@media foo2': {d2:{backgroundColor: 'yellow'}}};
    applyMediaQueries(registeredMediaQueries, styleSheet2, true);
    var registeredMediaQuery = registeredMediaQueries[0];
    expect(registeredMediaQuery.stylesheet).toBe(styleSheet2);
    expect(registeredMediaQuery.query).toBe('foo2');
    expect(registeredMediaQuery.compiled.d.backgroundColor).toBe('blue');
    expect(registeredMediaQuery.styleNames.length).toBe(2);
    expect(registeredMediaQuery.styleNames[0]).toBe('d');
    expect(registeredMediaQuery.styleNames[1]).toBe('@media foo2');
  });

  it ('should attach only 1 listener per media query', function() {
    var listenerCounter = 0;
    window.matchMedia = function() {
      return {
        matches: true,
        addListener:function(){listenerCounter++;}
      };
    };
    var applyMediaQueries = require('../applyMediaQueries');
    var registeredMediaQueries = [];
    var styleSheet = {d:{backgroundColor:'blue'}, '@media foo2': {d:{backgroundColor: 'yellow'}}};
    var styleSheet2 = {dx:{backgroundColor:'blue'}, '@media foo2': {dx:{backgroundColor: 'yellow'}}};
    applyMediaQueries(registeredMediaQueries, styleSheet, true);
    applyMediaQueries(registeredMediaQueries, styleSheet2, true);
    expect(listenerCounter).toBe(1);
  });


});