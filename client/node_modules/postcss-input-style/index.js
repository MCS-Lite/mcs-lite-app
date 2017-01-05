'use strict';

var postcss = require('postcss');


// Map new selectors to outputs
var selectors = {
  rangeTrack: '::track',
  rangeThumb: '::thumb'
};

var pseudos = {
  rangeTrack: [
    '::-webkit-slider-runnable-track',
    '::-moz-range-track',
    '::-ms-track'
  ],

  rangeThumb: [
    '::-webkit-slider-thumb',
    '::-moz-range-thumb',
    '::-ms-thumb'
  ]
};

/**
 * Check if selector in array contains any of our psuedo elements
 * @param  {String} selector string to check for elements
 * @return {Boolean}         whether it contains pseudo
 */
var containsPseudo = function(selector) {
  return selector.match(/::track|::thumb/);
};

/**
 * Check if selector in array is free from our psuedo elements
 * @param  {String} selector string to check for elements
 * @return {Boolean}         whether it is free from pseudo
 */
var doesntContainPseudo = function(selector) {
  return selector.match(/^((?!(::thumb|::track)).)*$/);
};

/**
 * Extra processing for new range track rules
 * @param  {Object} rule CSS rule to process
 * @return undefined
 */
var processTracks = function(rule) {

  if (rule.selector.indexOf('::-webkit-slider-runnable-track') > -1) {
    rule.prepend({ prop: '-webkit-appearance', value: 'none' });
  }

  if (rule.selector.indexOf('::-moz-range-track') > -1) {
    rule.prepend({ prop: '-moz-appearance', value: 'none' });
  }

};

/**
 * Extra processing for new range thumb rules
 * @param  {Object} rule CSS rule to process
 * @return undefined
 */
var processThumbs = function(rule) {

  if (rule.selector.indexOf('::-webkit-slider-thumb') > -1) {
    rule.prepend({ prop: '-webkit-appearance', value: 'none' });
  }

  if (rule.selector.indexOf('::-moz-range-thumb') > -1) {
    rule.prepend({ prop: '-moz-appearance', value: 'none' });
  }

};


/**
 * Expand and process CSS rules
 * @param  {Object} rule CSS rule to transform
 * @return undefined
 */
var ruleHandler = function(rule) {

  // Loop over our selectors
  Object.keys(selectors).forEach(function(select){

    // If the rule doesn't contain our selector, exit
    if (rule.selector.indexOf(selectors[select]) === -1){
      return;
    }

    // Expand the pseudo selector
    pseudos[select].forEach(function(pseudo){

      // Create the new rule
      var newRule,
          newSelector;

      newRule = rule.cloneBefore();
      newSelector = newRule.selectors.filter(containsPseudo).map(function(selector){
        return selector.replace(selectors[select], pseudo);
      }).join(',\n');

      newRule.selector = newSelector;

      // Do extra processing on the new rules
      processTracks(newRule);
      processThumbs(newRule);

    });

    // Add necessary additional base rules
    var webkitRule = rule.cloneBefore();
    webkitRule.selector = 'input[type="range"]';
    webkitRule.removeAll().append({ prop: '-webkit-appearance', value: 'none' });

    var mozRule = rule.cloneBefore();
    mozRule.selector = 'input[type="range"]::-moz-focus-outer';
    mozRule.removeAll().append({ prop: 'border', value: '0' });

    // If the rule only contained our elements remove it, else clean it
    if (rule.selectors.every(containsPseudo)) {
      rule.remove();
    } else {
      rule.selector = rule.selectors.filter(doesntContainPseudo).join(',\n');
    }

  });

};

module.exports = postcss.plugin('postcss-input-style', function () {
  return function (css) {

    css.walkRules(function(rule) {

      if (!containsPseudo(rule.selector)) {
        return;
      }

      // Handle dem rules
      ruleHandler(rule);

    });

  };
});
