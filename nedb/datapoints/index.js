var Datastore = require('nedb');
var datapoints = new Datastore({ filename: './db/datapoints.json', autoload: true});
var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = {
  validateSchema: function(object) {
    return v.validate(object, schema);
  },

  uploadDatapoint: function(field) {
    field.createdAt = new Date().getTime();
    field.updatedAt = new Date().getTime();
    field.isActive = true;

    return new Promise(function(resolve, reject) {
      var validataSchema = v.validate(field, schema);

      if (validataSchema.errors.length === 0) {
        return resolve();
      } else {
        return reject({ schema: validataSchema.errors })
      }
    })
    .then(function() {
      return new Promise (function(resolve, reject) {
        return datapoints.insert(field, function(err, data) {
          if (err) return reject();
          return resolve(data);
        });
      });
    });
  },

  retrieveDeviceAllDatapoint: function(query, sort, skip, limit) {
    return new Promise(function(resolve, reject) {
      if (sort && skip && limit) {
        return
          datapoints
          .find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(function(err, data) {
            if (err) return reject();
            return resolve(data);
          });
      } else {
        return datapoints.find(query, function(err, data) {
          if (err) return reject();
          return resolve(data);
        });
      }
    });
  },

  retrieveDatachannelDatapoint: function(query, sort, skip, limit) {
    return new Promise(function(resolve, reject) {
      if (sort && skip && limit) {
        datapoints
          .find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(function(err, data) {
            if (err) return reject();
            return resolve(data);
          });
      } else {
        return datapoints.find(query, function(err, data) {
          if (err) return reject();
          return resolve(data);
        });
      }
    });
  },
}