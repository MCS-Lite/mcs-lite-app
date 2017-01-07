var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = function(datachannels, prototypes) {
  return {
    validateSchema: function(object) {
      return v.validate(object, schema);
    },
  };
}