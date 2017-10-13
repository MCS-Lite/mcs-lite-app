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

    deleteDatachannel: function(query) {
      return new Promise(function(resolve, reject) {
        return datachannels.update(query, { $set: { updatedAt: new Date().getTime(), isActive: false } }, {}, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success.' });
        });
      });
    },

    cloneDatachannel: function(fromPrototypeId, toPrototypeId, userId) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        return datachannels.find({
            prototypeId: fromPrototypeId,
            isActive: true,
          }, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      })
      .then(function(data) {
        var datachannelPromise = []
        data.forEach(function(k, v) {
          k.prototypeId = toPrototypeId;
          k.createUserId = userId;
          delete k._id;
          datachannelPromise.push(_this.addNewDatachannel(k));
        });
        return Promise.all(datachannelPromise)
      });
    },

    importDataChannel: function(datachannel, userId, prototypeId, isMCSLite) {
      var _this = this;
      var channelPool = [];
      datachannel.forEach(function(key, index) {
        key.prototypeId = prototypeId;
        key.createUserId = userId;
        channelPool.push(_this.addNewDatachannel(key));
      });
      return Promise.all(channelPool)
    },

    clearAllDatachannels: function() {
      return new Promise(function(resolve, reject) {
        return datachannels.remove({}, { multi: true }, function(err) {
          if (err) return reject(err);
          return resolve();
        });
      });
    },
  };
};
