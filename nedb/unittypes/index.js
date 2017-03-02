var Validator = require('jsonschema').Validator;
var v = new Validator();

var schema = require('./schema');

module.exports = function(unittypes) {
  return {
    retrieveUnitTypes: function(query) {
      query.isActive = true;

      return new Promise(function(resolve, reject) {
        return unittypes.find(query, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      });
    },
    addNewUnitTypes: function(field) {
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();

      return new Promise( function(resolve, reject) {
        /* validate schema */
        var validataSchema = v.validate(field, schema);

        if (validataSchema.errors.length === 0) {
          return resolve();
        } else {
          return reject({ schema: validataSchema.errors })
        }
      })
      .then(function() {
        return new Promise(function(resolve, reject) {
          return unittypes.insert(field, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        });
      });
    },
  };
}