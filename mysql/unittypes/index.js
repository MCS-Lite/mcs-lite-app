// var Validator = require('jsonschema').Validator;
// var v = new Validator();
var Sequelize = require('sequelize');
// var schema = require('./schema');

module.exports = function(unittypes) {
  return {
    retrieveUnitTypes: function(query) {

      return new Promise(function(resolve, reject) {
        return unittypes
        .findAll({
          where: Sequelize.and(
            { isActive: true },
            Sequelize.or(
              { isTemplate: true },
              query
            )
          ),
        })
        .success(function(data) {
          if (data.length > 0) {
            const unittypes = data.map(function(item) {
              return item.dataValues;
            })
            return resolve(unittypes);
          }

          return resolve([]);
        })
        .error(function(data) {
          if (err) return reject();
        });
      });
    },
    addNewUnitTypes: function(field) {
      // field.createdAt = new Date().getTime();
      // field.updatedAt = new Date().getTime();

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
          .success(function(data) {
            return resolve(data.dataValues);
          })
          .error(function(err) {
            if (err) return reject();
          });
        });
      // });
    },

    clearAllUnittypes: function() {
      return new Promise(function(resolve, reject) {
        return unittypes
          .destroy({ isTemplate: false })
          .success(function() {
            return resolve();
          })
          .error(function(err) {
            return reject(err);
          });
      });
    },
  };
}
