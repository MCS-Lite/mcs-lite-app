'use strict';

var currCSSKey = 0;
var allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Get an unique CSS key for the className in a file. It supports up
 * to 140608 classNames.
 *
 * @return {string}
 */
function generateUniqueCSSClassName() {
  var allowedCharactersLength = allowedCharacters.length;
  var key1unit = allowedCharactersLength * allowedCharactersLength;
  var key1pos = Math.floor(currCSSKey / key1unit);
  var key1 = allowedCharacters[key1pos - 1];
  var key2pos = Math.floor((currCSSKey -
  (key1 ? key1pos * key1unit : 0)) / allowedCharactersLength);
  var key2 = allowedCharacters[key2pos - 1];
  var key3 = allowedCharacters[(currCSSKey -
                               (key1 ? (key1pos * key1unit) : 0) -
                               (key2 ? key2pos * allowedCharactersLength : 0))];
  var key = '';
  if (key1) {
    key += key1;
  }
  if (key2) {
    key += key2;
  }
  if (key3) {
    key += key3;
  }
  currCSSKey++;

  return key;
}

module.exports = generateUniqueCSSClassName;