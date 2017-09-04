// var Validator = require('jsonschema').Validator;
// var v = new Validator();

// var schema = require('./schema');

module.exports = function(unittypes) {
  return {
    retrieveUnitTypes: function(query) {
      query.isActive = true;

      return new Promise(function(resolve, reject) {
        return unittypes.find({ where: query })
        .success(function(data) {
          return resolve(data);
        })
        .error(function(data) {
          if (err) return reject();
        });
      });
    },
    addNewUnitTypes: function(field) {
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();

      // return new Promise( function(resolve, reject) {
      //   /* validate schema */
      //   var validataSchema = v.validate(field, schema);

      //   if (validataSchema.errors.length === 0) {
      //     return resolve();
      //   } else {
      //     return reject({ schema: validataSchema.errors })
      //   }
      // })
      // .then(function() {
        return new Promise(function(resolve, reject) {
          return unittypes
          .create(field)
          .sucess(function(data) {
            return resolve(data);
          })
          .error(function(err) {
            if (err) return reject();            
          });
        });
      // });
    },
  };
}