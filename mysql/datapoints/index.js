// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');

module.exports = function(datapoints, devices) {
  return {
    // validateSchema: function(object) {
    //   return v.validate(object, schema);
    // },

    uploadDatapoint: function(field) {
      // field.createdAt = new Date().getTime();
      // field.updatedAt = new Date().getTime();
      field.isActive = true;
      if (field.values) field.values = JSON.stringify(field.values);

      // return new Promise(function(resolve, reject) {
      //   var validataSchema = v.validate(field, schema);

      //   if (validataSchema.errors.length === 0) {
      //     return resolve();
      //   } else {
      //     return reject({ schema: validataSchema.errors })
      //   }
      // })
      // .then(function() {
        return new Promise(function(resolve, reject) {
          return devices.find({
            where: {
              deviceId: field.deviceId,
              deviceKey: field.deviceKey,
            },
          })
          .success(function(data) {
            if (data === null) {
              return reject({ message: 'DeviceId / DeviceKey is invalid.'});
            } else {
              return resolve(data.dataValues);
            }
          })
          .error(function(err) {
            return reject();
          });
        })
      // })
      .then(function() {
        return new Promise (function(resolve, reject) {
          return datapoints
          .create(field)
          .success(function(data) {
            return resolve(data);
          })
          .error(function(err) {
            if (err) return reject();
          });
        });
      });
    },

    retrieveDeviceAllDatapoint: function(query, sort, offset, limit) {
      return new Promise(function(resolve, reject) {
        if (sort && typeof(offset) === 'number' && limit) {
          var order = '';
          Object.keys(sort).forEach(function(key) {
            if (sort[key] < 0) {
              order = sort[key] + ' DESC';
            } else {
              order = sort[key] + ' ASC';
            }
          });

          return
            datapoints
            .findAll({
              where: query,
              order: order,
              limit: limit,
              offset: offset,
            })
            .success(function(data) {
              let adjustData = []
              data.forEach(function(key) {
                key.dataValues.values = JSON.parse(key.dataValues.values);
                adjustData.push(key.dataValues);
              });
              return resolve(adjustData);
            })
            .error(function(err) {
              if (err) return reject();
            });
        } else {
          return datapoints
          .find(query)
          .success(function(data) {
            return resolve(data);
          })
          .error(function(err) {
            if (err) return reject();
          });
        }
      });
    },

    retrieveDatachannelDatapoint: function(query, sort, offset, limit) {
      return new Promise(function(resolve, reject) {
        if (sort && typeof(offset) === 'number' && limit) {
          var order = '';
          Object.keys(sort).forEach(function(key) {
            if (sort[key] < 0) {
              order = sort[key] + ' DESC';
            } else {
              order = sort[key] + ' ASC';
            }
          });

          return datapoints
            .findAll({
              where: query,
              order: order,
              limit: limit,
              offset: offset,
            })
            .success(function(data) {
              let adjustData = []
              data.forEach(function(key) {
                key.dataValues.values = JSON.parse(key.dataValues.values);
                adjustData.push(key.dataValues);
              });
              return resolve(adjustData);
            })
            .error(function(err) {
              if (err) return reject();
            });
            // .sort(sort)
            // .skip(skip)
            // .limit(limit)
            // .exec(function(err, data) {
            //   if (err) return reject();
            //   return resolve(data);
            // });
        } else {
          return datapoints
          .find(query)
          .success(function(data) {
            if (data) {
              data.dataValues.values = JSON.parse(data.dataValues.values);
              return resolve(data.dataValues);
            } else {
              return resolve({});
            }
          })
          .error(function(err) {
            if (err) return reject();
          });
        }
      });
    },

    clearAllDatapoints: function() {
      return new Promise(function(resolve, reject) {
        return datapoints
          .destroy({}, { truncate: true })
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
