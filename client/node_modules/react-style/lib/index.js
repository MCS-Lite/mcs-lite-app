'use strict';

var assign                          = require("react/lib/Object.assign");
var ReactElementExtended            = require('./ReactElementExtended');
var ReactCompositeComponentExtended = require('./ReactCompositeComponentExtended.js');
var ExecutionEnvironment            = require('fbjs/lib/ExecutionEnvironment');

var applyMediaQueries               = require('./applyMediaQueries');
var generateUniqueCSSClassName      = require('./generateUniqueCSSClassName');
var stylesToCSS                     = require('./stylesToCSS');

var isArray                         = Array.isArray;
var keys                            = Object.keys;

var registeredMediaQueries          = [];
var styles                          = [];
var mediaQueries                    = {};

var isProduction                    = process.env.NODE_ENV === 'production';

function createStyle(props, className, uniqueKey) {
  styles.push({
    style: props,
    className: className,
    uniqueKey: uniqueKey
  });
  return className;
}

function createStyleSheet(stylesheet, useClassName) {
  if (!useClassName) {
    // default
    stylesheet = applyMediaQueries(registeredMediaQueries, stylesheet, true);
    return stylesheet;
  }
  else {
    ReactElementExtended.maxOverridesLength = StyleSheet.maxOverridesLength;

    // export to separate CSS classes
    var styleSheetStyles = keys(stylesheet);
    var results = {};
    for (var i = 0, l = styleSheetStyles.length; i < l; i++) {
      var styleName = styleSheetStyles[i];
      var isMediaQuery = !styleName.indexOf('@media ');
      var style = stylesheet[styleName];
      var origUniqueKey = generateUniqueCSSClassName();
      var uniqueKey = origUniqueKey;
      if (!isProduction) {
        uniqueKey = styleName + '_' + uniqueKey;
      }

      if (isMediaQuery) {
        var mqStyleNames = keys(style);
        var newStyle = {};
        for (var i2 = 0, l2 = mqStyleNames.length; i2 < l2; i2++) {
          var mqStyleName = mqStyleNames[i2];
          var mqStyle = style[mqStyleName];
          var uniqueKey2 = results[mqStyleName];
          if (uniqueKey2) {
            newStyle[uniqueKey2] = mqStyle;
          }
        }

        if (!mediaQueries[styleName]) {
          mediaQueries[styleName] = {};
        }

        keys(newStyle).reduce(function (acc, key) {
          if (!acc[key]) {
            acc[key] = newStyle[key];
          }
          return acc;
        }, mediaQueries[styleName]);

          continue;
      }
      results[styleName] = createStyle(style, isMediaQuery ? styleName : uniqueKey, origUniqueKey);
    }

    return results;
  }
}

var StyleSheet = {
  compile: function(maxLength) {
    var mq = keys(mediaQueries).map(function(query){
      return {
        style: mediaQueries[query],
        className: query,
        uniqueKey: ''
      };
    });

    return stylesToCSS(styles.concat(mq), maxLength || 10);
  },
  create: createStyleSheet
};

ReactCompositeComponentExtended.associateToMediaQuery = function(comp) {
  var styles = comp.props.__cachedStyles;
  for (var i = 0, l = styles.length; i < l; i++) {
    var style = styles[i];
    for (var j = 0, l2 = registeredMediaQueries.length; j < l2; j++) {
      var registeredMediaQuery = registeredMediaQueries[j];
      var stylesheet = registeredMediaQuery.compiled;
      var stylesheetNames = registeredMediaQuery.styleNames;
      for (var i2 = 0, l3 = stylesheetNames.length; i2 < l3; i2++) {
        var styleName = stylesheetNames[i2];
        var compiledStyle = stylesheet[styleName];
        if (style === compiledStyle) {
          registeredMediaQuery.elements.push(comp);
        }
      }
    }
  }
};


module.exports = StyleSheet;
