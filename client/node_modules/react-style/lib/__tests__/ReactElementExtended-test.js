'use strict';

jest.autoMockOff();

describe('ReactElementExtended', function() {

  it ('should style React.DOM elements when a styles property is given', function() {
    var React = require('react');

    var StyleSheet = require('../');
    var DOM = React.DOM;

    require('../ReactElementExtended');

    var tagNames = Object.keys(DOM);
    var style = {backgroundColor: 'green'};
    var styles = StyleSheet.create({foo:style});
    for (var i = 0, l = tagNames.length; i < l; i++) {
      var tagName = tagNames[i];
      expect(React.createElement(tagName, {styles: [styles.foo]}).props.style).toEqual(style);
    }
  });

});
