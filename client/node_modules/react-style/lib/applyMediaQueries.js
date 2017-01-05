'use strict';

var assign                 = require("react/lib/Object.assign");
var recalcMediaQueryStyles = require('./recalcMediaQueryStyles');

var matchMedia = null;
if (typeof window !== 'undefined' && !window.__ReactStyle__) {
  matchMedia = window.matchMedia;
}
var mediaQueryBreakPoints = {};
var hasVisibilityChangeListener = false;

function applyMediaQueries(registeredMediaQueries, stylesheet, register) {
  var newStyleSheet = {};
  var styleNames = Object.keys(stylesheet);

  function recalc() {
    recalcMediaQueryStyles(registeredMediaQueries);
  }

  if (!hasVisibilityChangeListener
      && typeof document !== 'undefined'
      && 'visibilityState' in document) {
    hasVisibilityChangeListener = true;
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === 'visible') {
        recalc();
      }
    });
  }

  for (var i = 0, l = styleNames.length; i < l; i++) {
    var styleName = styleNames[i];
    var style = stylesheet[styleName];
    // only position 0 = false, so !0 = true
    if (!styleName.indexOf('@media')) {
      var mediaQuery = styleName.substr('@media '.length);
      var isMediaQueryActive = false;

      if (matchMedia && matchMedia(mediaQuery).matches) {
        isMediaQueryActive = true;
        var mqStyleNames = Object.keys(style);
        for (var j = 0, l2 = mqStyleNames.length; j < l2; j++) {
          var mqStyleName = mqStyleNames[j];

          // warn for undeclared block
          if ("production" !== process.env.NODE_ENV) {
            if (!stylesheet[mqStyleName]) {
              console.warn('Media query \'' + styleName + '\' referred to undeclared style block \'' + mqStyleName + '\'.');
              continue;
            }
          }
          newStyleSheet[mqStyleName] = assign({}, newStyleSheet[mqStyleName], style[mqStyleName]);
        }
      }

      // register media query for recalc
      if (register) {
        registeredMediaQueries.push({
          compiled: newStyleSheet,
          elements: [],
          isActive: isMediaQueryActive,
          query: mediaQuery,
          styleNames: styleNames,
          stylesheet: stylesheet
        });

        if (matchMedia && !mediaQueryBreakPoints[mediaQuery]) {
          matchMedia(mediaQuery).addListener(recalc);
          mediaQueryBreakPoints[mediaQuery] = true;
        }
      }
    }
    else {
      newStyleSheet[styleName] = style;
    }
  }

  return newStyleSheet;
}


module.exports = applyMediaQueries;
