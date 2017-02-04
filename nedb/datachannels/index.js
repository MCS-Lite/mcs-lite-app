var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = function(datachannels, prototypes) {

  return {
    validateSchema: function(object) {
      return v.validate(object, schema);
    },
    retrievDatachannel: function(field) {
      field.isActive = true;
      return new Promise(function(resolve, reject) {
        return datachannels.find(field, function(err, data) {
          if (err) return reject();
          return resolve(data);
        });
      });
    },
    addNewDatachannel: function(field) {
      field.updatedAt = new Date().getTime();
      field.createdAt = new Date().getTime();
      field.isActive = true;

      return new Promise(function(resolve, reject) {
        return prototypes.find({
          prototypeId: field.prototypeId,
        }, function(err, data) {
          if (err) return reject();
          if (data.length === 1) {
            return resolve(data[0]);
          } else {
            return reject({ error: 'Can not find this prototypeId.' });
          }
        })
      })
      .then(function() {
        return new Promise(function(resolve, reject) {
          var validataSchema = v.validate(field, schema);

          if (validataSchema.errors.length === 0) {
            return resolve();
          } else {
            return reject({ schema: validataSchema.errors })
          }
        });
      })
      .then(function() {
        return new Promise(function(resolve, reject) {
          return datachannels.insert(field, function(err, data) {
            if (err) return reject();
            return resolve(data);
          });
        });
      });
    },

    editDatachannel: function(query, update) {
      return new Promise(function(resolve, reject) {
        return datachannels.update(query, { $set: update }, {}, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success.' });
        });
      });
    },
  };
}