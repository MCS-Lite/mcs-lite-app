var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');
var shortid = require('shortid');
var crypto = require('crypto');
var configs = require('../../configs/rest');

module.exports = function(prototypes) {
  return {
    validateSchema: function(object) {
      return v.validate(object, schema);
    },

    retriveUserPrototypes: function(query, sort, skip, limit) {
      return new Promise(function(resolve, reject) {
        if (typeof(skip) === 'number' && sort && limit) {
          return prototypes
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function(err, data) {
              if (err) return reject();
              return resolve(data);
            });
        } else {
          return prototypes.find(query, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        }
      });
    },

    retriveAllPrototypes: function(query, sort, skip, limit) {
      return new Promise(function(resolve, reject) {
        if (typeof(skip) === 'number' && sort && limit) {
          return
            prototypes
            .find({})
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function(err, data) {
              if (err) return reject();
              return resolve(data);
            });
        } else {
          return prototypes.find({}, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        }
      });
    },

    retriveAllTemplatesPrototypes: function(sort, skip, limit) {
      return new Promise(function(resolve, reject) {
        if (typeof(skip) === 'number' && sort && limit) {
          return
            prototypes
            .find({ isTemplate: true, isActive: true })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function(err, data) {
              if (err) return reject();
              return resolve(data);
            });
        } else {
          return prototypes.find({ isTemplate: true, isActive: true }, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        }
      });
    },

    addNewPrototype: function(field) {
      field.isPublic = false;
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();
      field.fwId = '';
      field.isActive = true;
      field.prototypeId = shortid.generate();
      field.prototypeKey =  crypto
        .createHmac('sha256', configs.prototypeKey)
        .update(field.createdAt.toString() + field.prototypeId)
        .digest('hex');;

      var validataSchema = v.validate(field, schema);

      return new Promise( function(resolve, reject) {
        /* validate schema */
        var validataSchema = v.validate(field, schema);

        if (validataSchema.errors.length === 0) {
          return resolve();
        } else {
          return reject({ schema: validataSchema.errors })
        }
      })
      .then(function() {
        return new Promise(function(resolve, reject) {
          return prototypes.insert(field, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        });
      });
    },

    editPrototype: function(query, update) {
      update.updatedAt = new Date().getTime();
      return new Promise(function(resolve, reject) {
        return prototypes.update(query, { $set: update }, {}, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success' });
        });
      });
    },

    deletePrototype: function(query, update) {
      update.updatedAt = new Date().getTime();
      return new Promise(function(resolve, reject) {
        return prototypes.update(query, { $set: update }, {}, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success' });
        });
      });
    },

    clonePrototype: function(prototypeId, data) {
      var field = {};
      field.isPublic = false;
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();
      field.isActive = true;
      field.fwId = '';
      field.isTemplate = false;
      field.prototypeId = shortid.generate();
      field.prototypeKey =  crypto
        .createHmac('sha256', configs.prototypeKey)
        .update(field.createdAt.toString() + field.prototypeId)
        .digest('hex');;
      field.prototypeName = data.prototypeName || '';
      field.prototypeDescription = data.prototypeDescription || '';
      field.createdUserId = data.userId;
      var validataSchema = v.validate(field, schema);

      return new Promise(function(resolve, reject) {
        return prototypes.find({ prototypeId: prototypeId, isActive: true}, function(err, data) {
          if (err) return reject();
          if (data.length != 1) {
            return reject({ error: 'This prototypeId is not valid.' });
          }
          resolve(data);
        });
      })
      .then(function(data) {
        field.prototypeImageURL = data[0].prototypeImageURL || '';
        field.version = data[0].version || '';

        return new Promise( function(resolve, reject) {
          /* validate schema */
          var validataSchema = v.validate(field, schema);

          if (validataSchema.errors.length === 0) {
            return resolve();
          } else {
            return reject({ schema: validataSchema.errors })
          }
        })
      })
      .then(function(data) {
        return new Promise(function(resolve, reject) {
          return prototypes.insert(field, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        });
      })
    },
  };
}