// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');

module.exports = function(datachannels, prototypes) {

  return {
    // validateSchema: function(object) {
    //   return v.validate(object, schema);
    // },

    retrievDatachannel: function(field) {
      field.isActive = true;
      return new Promise(function(resolve, reject) {
        return datachannels.find({ where: field })
        .success(function(data) {
          return resolve(data);
        })
        .error(function(err) {
          return reject(err);
        });
      });
    },

    addNewDatachannel: function(field) {
      field.updatedAt = new Date().getTime();
      field.createdAt = new Date().getTime();
      field.isActive = true;

      return new Promise(function(resolve, reject) {
        return prototypes.find({
          where: {
            prototypeId: field.prototypeId,
          },
        })
        .success(function(data) {
          if (data.length === 1) {
            return resolve(data[0]);
          } else {
            return reject({ error: 'Can not find this prototypeId.' });
          }
        })
        .error(function(err) {
          return reject(err);
        });
      })
      // .then(function() {
      //   return new Promise(function(resolve, reject) {
      //     var validataSchema = v.validate(field, schema);

      //     if (validataSchema.errors.length === 0) {
      //       return resolve();
      //     } else {
      //       return reject({ schema: validataSchema.errors })
      //     }
      //   });
      // })
      .then(function() {
        return new Promise(function(resolve, reject) {
          return datachannels
          .create(field)
          .success(function(data) {
            return resolve(data);
          })
          .error(function(err) {
            return reject(err);
          });
        });
      });
    },

    editDatachannel: function(query, update) {
      return new Promise(function(resolve, reject) {
        return datachannels
        .update(update, { where: query })
        .success(function(num) {
          return resolve({ message: 'success.' });
        })
        .error(function(err) {
          return reject();
        });
      });
    },

    deleteDatachannel: function(query) {
      return new Promise(function(resolve, reject) {
        return datachannels
        .update({ 
          updatedAt: new Date().getTime(), 
          isActive: false,
        }, { 
          where: query 
        })
        .success(function() {
          return resolve({ message: 'success.' });          
        })
        .error(function(err) {
          return reject();
        });
      });
    },

    cloneDatachannel: function(fromPrototypeId, toPrototypeId, userId) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        return datachannels.find({
          where: {
            prototypeId: fromPrototypeId,
            isActive: true,
          }
        })
        .success(function(data) {
          return resolve(data);
        })
        .error(function(err) {
          return reject(err);
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
  };
}