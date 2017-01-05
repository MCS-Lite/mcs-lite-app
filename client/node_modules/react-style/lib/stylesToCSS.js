'use strict';

var isUnitlessNumber = require('react/lib/CSSProperty').isUnitlessNumber;
var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');
var isArray = Array.isArray;
var keys = Object.keys;
var unsupportedPseudoClasses = require('./unsupportedPseudoClasses');

var counter = 1;
// Follows syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/content,
// including multiple space separated values.
var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

function buildRule(result, key, value, selector) {
  if (!isUnitlessNumber[key] && typeof value === 'number') {
    value = '' + value + 'px';
  }
  else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    value = "'" + value.replace(/'/g, "\\'") + "'";
  }

  result.css += '  ' + hyphenateStyleName(key) + ': ' + value + ';\n';
}

function buildRules(result, rules, uniqueKey, selector, maxLength, key) {
  if (!rules || keys(rules).length === 0) {
    return result;
  }

  var replicatedSelector = replicateSelector(selector, uniqueKey, maxLength, key);
  result.css += replicatedSelector + ' {\n';
  var styleKeys = keys(rules);
  for (var j = 0, l = styleKeys.length; j < l; j++) {
    var styleKey = styleKeys[j];
    var value = rules[styleKey];

    if (unsupportedPseudoClasses[styleKey.split('(')[0].trim()]) {
      if ("production" !== process.env.NODE_ENV) {
        console.warn('You are trying to use pseudo class ' + styleKey +
        ', which we don\'t support as this is better implemented using ' +
        'JavaScript.');
      }

      continue;
    }

    if (isArray(value)) {
      for (var i = 0, len = value.length; i < len; i++) {
        buildRule(result, styleKey, value[i], selector, maxLength);
      }
    }
    else {
      buildRule(result, styleKey, value, selector, maxLength);
    }
  }
  result.css += '}\n';

  return result;
}

function buildMediaQuery(result, rules, selector, maxLength) {
  result.css += selector + '{\n';
  var ruleKeys = keys(rules);
  for (var i = 0, l = ruleKeys.length; i < l; i++) {
    var ruleKey = ruleKeys[i];
    var rule = rules[ruleKey];
    var ruleKeySplit = ruleKey.split('_');
    var uniqueKey = ruleKeySplit[ruleKeySplit.length - 1];
    buildRules(result, rule, uniqueKey, '.' + ruleKey, maxLength);
  }
  result.css += '}\n';
}

function replicateSelector(selector, uniqueKey, max, key) {
  var maxLength = max || 10;
  var _key = key || '';
  var replicatedSelector = [];
  for (var i = 0; i < maxLength; i++) {
    var newSelector = '';
    for (var j = 0, l2 = i + 1; j < l2; j++) {
      var selectorX = j === 0 ? selector : '.' + uniqueKey;
      newSelector += selectorX + (j !==0 ? j : '');
    }
    replicatedSelector[i] = newSelector + _key;
  }
  return replicatedSelector.join(',');
}

function buildStyle(result, style, selector, maxLength) {
  if (!style.className) {
    return;
  }
  if (!selector && result.classNames[style.className]) {
    return;
  }
  if (!selector) {
    result.classNames[style.className] = counter++;
    selector = '.' + style.className;
  }
  if (!selector.indexOf('.@media ')) {
    buildMediaQuery(result, style.style, selector.substr(1), maxLength);
  }
  else {
    buildRules(result, style.style, style.uniqueKey, selector, maxLength);
  }
}

function stylesToCSS(styles, maxLength) {
  if (!isArray(styles)) {
    styles = [styles];
  }

  var result = {css: '', classNames: {}};
  for (var i = 0, len = styles.length; i < len; i++) {
    var style = styles[i];
    buildStyle(result, style, null, maxLength);
  }
  return result;
}

module.exports = stylesToCSS;
