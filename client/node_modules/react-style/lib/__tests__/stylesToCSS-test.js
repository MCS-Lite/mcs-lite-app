'use strict';

jest.autoMockOff();

describe('stylesToCSS', function() {

  it('should ignore pseudo classes', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        backgroundColor: 'orange',
        ':not(something': {
          color: 'green'
        },
        ':hover': {
          color: 'orange'
        }
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf(':not(')).toBe(-1);
    expect(compiled.css.indexOf(':hover')).toBe(-1);
  });

  it('should warn when using pseudo classes', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        backgroundColor: 'orange',
        ':hover': {
          color: 'green'
        }
      }
    };
    var _msg = '';
    var originalConsoleWarn = console.warn;
    console.warn = function(msg) {
      _msg = msg;
    };
    stylesToCSS(fooStyle, 10);
    expect(_msg).toBe('You are trying to use pseudo class :hover, which we ' +
                      'don\'t support as this is better implemented using ' +
                      'JavaScript.');
    console.warn = originalConsoleWarn;
  });

  it('should not add style without a className', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {

    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toEqual('');
  });

  it('should not add a style if it\'s already present', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        backgroundColor: 'orange'
      }
    };
    var fooStyle2 = {
      className: 'yolo',
      style: {
        backgroundColor: 'orange'
      }
    };

    var oneStyle = stylesToCSS(fooStyle, 10);
    var doubleStyle = stylesToCSS([fooStyle, fooStyle2], 10);

    expect(oneStyle.css).toEqual(doubleStyle.css);
  });

  it('should replicate the selector', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        backgroundColor: 'purple'
      },
      uniqueKey: 'y'
    };
    var compiled = stylesToCSS(fooStyle, 10);
    var replicatedSelector = compiled.css.split(' {')[0].split(',');
    var selector = '.yolo';
    for (var i = 0, l = replicatedSelector.length; i < l; i++) {
      if(i > 0) {
        selector += '.y' + i;
      }
      expect(selector).toEqual(replicatedSelector[i]);
    }
  });

  it('compiles numbers into px literals', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        top: 0
      },
      uniqueKey: 'y'
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.y1',
    '.yolo.y1.y2',
    '.yolo.y1.y2.y3',
    '.yolo.y1.y2.y3.y4',
    '.yolo.y1.y2.y3.y4.y5',
    '.yolo.y1.y2.y3.y4.y5.y6',
    '.yolo.y1.y2.y3.y4.y5.y6.y7',
    '.yolo.y1.y2.y3.y4.y5.y6.y7.y8',
    '.yolo.y1.y2.y3.y4.y5.y6.y7.y8.y9'
    ].join(',') + ' {',
    '  top: 0px;',
    '}',
    ''
    ].join('\n'));
  });

  it('should not add px to unitless numbers', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        zIndex: 4
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('z-index: 4;')).toBeGreaterThan(0);
  });

  it('compiles styles', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: 'red'
      },
      uniqueKey: 'y'
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toBe([
    [
      '.yolo',
      '.yolo.y1',
      '.yolo.y1.y2',
      '.yolo.y1.y2.y3',
      '.yolo.y1.y2.y3.y4',
      '.yolo.y1.y2.y3.y4.y5',
      '.yolo.y1.y2.y3.y4.y5.y6',
      '.yolo.y1.y2.y3.y4.y5.y6.y7',
      '.yolo.y1.y2.y3.y4.y5.y6.y7.y8',
      '.yolo.y1.y2.y3.y4.y5.y6.y7.y8.y9'
    ].join(',') + ' {',
    '  color: red;',
    '}',
    ''
    ].join('\n'));
  });

  it('replicates with the duplicate style key', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: ['red', 'white']
      },
      uniqueKey: 'y'
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toBe([
    [
      '.yolo',
      '.yolo.y1',
      '.yolo.y1.y2',
      '.yolo.y1.y2.y3',
      '.yolo.y1.y2.y3.y4',
      '.yolo.y1.y2.y3.y4.y5',
      '.yolo.y1.y2.y3.y4.y5.y6',
      '.yolo.y1.y2.y3.y4.y5.y6.y7',
      '.yolo.y1.y2.y3.y4.y5.y6.y7.y8',
      '.yolo.y1.y2.y3.y4.y5.y6.y7.y8.y9'
    ].join(',') + ' {',
    '  color: red;',
    '  color: white;',
    '}',
    ''
    ].join('\n'));
  });

  it('should quote content value', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        content: "hello"
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('content: \'hello\';')).toBeGreaterThan(0);
  });

  it('should escape quoted content value', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        content: "''"
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('content: \'\\\'\\\'\';')).toBeGreaterThan(0);
  });

  it('should not quote valid content values', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        content: 'url(boo) attr(data-foo) open-quote'
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('content: url(boo) attr(data-foo) open-quote;')).toBeGreaterThan(0);
  });
});
