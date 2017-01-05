var UsageErrors = {
	PARAM_TYPE: new TypeError('You must pass an array to this function.'),
	CONSTANT_VALUE: new TypeError('Each constant in the array must be represented by a string')
};

module.exports = (function() {

  // Set the initial value for contiguous integer assignment to be 0.
  // By keeping this here, in the closure outside the function we can make sure that no integer value is ever repeated.
  var nextCompactValue = 0;

  return function (values, compact) {
    if(!(values instanceof Array)) {
      throw UsageErrors.PARAM_TYPE;
    }

    var constants = {}; // Constants will be returned with the new values
    if(!compact) {
      values.forEach(function(value) {
        if('string' !== typeof value) {
          throw UsageErrors.CONSTANT_VALUE;
        }
        constants[value.toUpperCase()] = value.toUpperCase();
      });
    } else {
      // When 'compact' is set to true, the value of the constants will be represented by contiguous integerss to make them more compact in memory
      values.forEach(function(key) {
        if('string' !== typeof key) {
          throw UsageErrors.CONSTANT_VALUE;
        }
        constants[key.toUpperCase()] = nextCompactValue++;
      });
    }

    return constants;
  };
}());
