var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = function(datapoints, devices) {
  return {
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
        return new Promise(function(resolve, reject) {
          return devices.find({
            deviceId: field.deviceId,
            deviceKey: field.deviceKey,
          }, function(err, data) {
            if (err) return reject();
            if (data.length != 1) {
              return reject({ message: 'DeviceId / DeviceKey is invalid.'});
            } else {
              return resolve(data[0]);
            }
          });
        })
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
        if (sort && typeof(skip) === 'number' && limit) {
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
        if (sort && typeof(skip) === 'number' && limit) {
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

    clearAllDatapoints: function() {
      return new Promise(function(resolve, reject) {
        return datapoints.remove({}, { multi: true }, function(err) {
          if (err) return reject(err);
          return resolve();
        });
      });
    },
  };
}
