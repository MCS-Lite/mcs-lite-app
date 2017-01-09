var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = function(datachannels, prototypes) {

  return {
    validateSchema: function(object) {
      return v.validate(object, schema);
    },

    addNewDatachannel: function(field) {
      return new Promise(function(resolve, reject) {
        return prototypes.find({
          prototypeId: field.prototypeId,
        }, function(err, data) {
          if (err) return reject();
          if (data.length === 1) {
            return resolve(data[0]);
          } else {
            return reject({ error: 'Can not find this prototyeId.' });
          }
        })
      })
      .then(function() {
        return new Promise(function(resolve, reject) {
          field.updatedAt = new Date().getTime();
          field.createdAt = new Date().getTime();
          field.isActive = true;
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
          console.log(num);
          if (err) return reject();
          resolve({ message: 'success.' });
        });
      });
    },
  };
}