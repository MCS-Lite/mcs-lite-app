// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');

module.exports = function(datapoints, devices) {
  return {
    // validateSchema: function(object) {
    //   return v.validate(object, schema);
    // },

    uploadDatapoint: function(field) {
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();
      field.isActive = true;

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
            // if (err) return reject();
            if (data.length != 1) {
              return reject({ message: 'DeviceId / DeviceKey is invalid.'});
            } else {
              return resolve(data[0]);
            }
          })
          .error(function(err) {
            return reject();
          });
        })
      // })
      .then(function() {
        delete field.deviceKey;
        return new Promise (function(resolve, reject) {
          return datapoints
          .create(field)
          .success(function(data) {
            // if (err) return reject();
            return resolve(data);
          })
          .error(function(err) {
            if (err) return reject();
            // return reject();
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
            // .find(query)
            .findAll({
              where: query,
              order: order, 
              limit: limit,
              offset: offset,
            })
            .success(function(data) {
              console.log(data);
              return resolve(data);
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
          return datapoints.find(query, function(err, data) {
            if (err) return reject();
            return resolve(data);
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

          datapoints
            // .find({
            //   where: query

            // })
            .findAll({
              where: query,
              order: order, 
              limit: limit,
              offset: offset,
            })
            .success(function(data) {
              // console.log(data);
              return resolve(data);
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
          return datapoints.find(query, function(err, data) {
            if (err) return reject();
            return resolve(data);
          });
        }
      });
    },
  };
}