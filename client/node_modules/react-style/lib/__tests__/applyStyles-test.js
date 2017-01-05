
jest.dontMock('../applyStyles');

function fakeStyle(className, style, isCompiled) {
  return {
    className: className,
    style: style,
    isCompiled: function() { return isCompiled; }
  };
}

describe('applyStyles', function() {

  it('should ignore empty styling', function(){
    var applyStyles = require('../applyStyles');
    var props = {};
    var oldPropStyles = props.styles;
    var order = applyStyles(props, null, 0);
    order = applyStyles(props, undefined, order);
    order = applyStyles(props, undefined, order);
    expect(order).toBe(0);
    expect(props.styles).toBe(oldPropStyles);
  });

  it('should modify className for a given string', function() {
    var applyStyles = require('../applyStyles');
    var props = {
      className: 'pleh',
      style: null
    };
    applyStyles(props, 'yo', 0);
    expect(props.className).toBe('pleh yo');
    expect(props.style).toBe(null);
  });

  it('should modify style prop for a given object', function(){
    var applyStyles = require('../applyStyles');
    var props = {
      className: null,
      style: null
    };
    applyStyles(props, {backgroundColor: 'green'}, 0);
    expect(props.className).toBe(null);
    expect(props.style.backgroundColor).toBe('green');
  });

  it('should merge inline styles', function() {
    var applyStyles = require('../applyStyles');
    var props = {
      className: null,
      style: null
    };
    var style1 = {
      backgroundColor: 'green',
      font: 'foo'
    };
    var style2 = {
      backgroundColor: 'blue',
      color: 'green'
    };

    applyStyles(props, [style1, [[style2]]], 0);

    expect(props.className).toBe(null);
    expect(props.style.backgroundColor).toBe('blue');
    expect(props.style.font).toBe('foo');
    expect(props.style.color).toBe('green');
  });

  it('should merge classNames', function() {
    var applyStyles = require('../applyStyles');
    var props = {
      className: null,
      style: null
    };
    applyStyles(props, ['a', [['b']]], 0);
    expect(props.className).toBe(' a b b1');
    expect(props.style).toBe(null);
  });

  it ('should warn when trying to override inline styles with a class', function() {
    var applyStyles = require('../applyStyles');
    var props = {
      className: null,
      style: null
    };
    var inlineStyle = {
      backgroundColor: 'green',
      font: 'foo'
    };
    var classStyle = 'bar';

    var _msg = '';
    var originalConsoleWarn = console.warn;
    console.warn = function(msg) {
      _msg = msg;
    };

    applyStyles(props, [inlineStyle, classStyle], 0);

    expect(_msg).toBe('You are trying to override inline styles with a ' +
                       'class, which might cause issues due to classes ' +
                       'having lower CSS specificity then inline styles.');
  });

});
