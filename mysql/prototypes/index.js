// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');
// var mcsOnlinePrototypeSchema = require('./importOnlineSchema');
// var mcsLitePrototypeSchema = require('./importLiteSchema');

var shortid = require('shortid');
var crypto = require('crypto');
var configs = require('../../configs/rest');

module.exports = function(prototypes) {
  return {
    // validateSchema: function(object) {
    //   return v.validate(object, schema);
    // },

    retriveUserPrototypes: function(query, sort, offset, limit) {
      return new Promise(function(resolve, reject) {
        if (typeof(offset) === 'number' && sort && limit) {
          var order = '';
          Object.keys(sort).forEach(function(key) {
            if (sort[key] < 0) {
              order = sort[key] + ' DESC';
            } else {
              order = sort[key] + ' ASC';
            }
          });

          return prototypes
          .findAll({
            where: query,
            order: order,
            limit: limit,
            offset: offset,
          })
          .success(function(data) {
            let adjustData = []
            data.forEach(function(key) {
              adjustData.push(key.dataValues);
            });
            return resolve(adjustData);
          })
          .error(function(err) {
            if (err) return reject();
          });
        } else {
          return prototypes
          .findAll({
            where: query,
          })
          .success(function(data) {
            let adjustData = []
            data.forEach(function(key) {
              adjustData.push(key.dataValues);
            });
            return resolve(adjustData);
          })
          .error(function(err) {
            if (err) return reject();
          });
        }
      });
    },

    retriveAllPrototypes: function(query, sort, offset, limit) {
      return new Promise(function(resolve, reject) {
        if (typeof(offset) === 'number' && sort && limit) {
          var order = '';
          Object.keys(sort).forEach(function(key) {
            if (sort[key] < 0) {
              order = sort[key] + ' DESC';
            } else {
              order = sort[key] + ' ASC';
            }
          });

          return
            prototypes
            .findAll({
              where: query,
              order: order,
              limit: limit,
              offset: offset,
            })
            .success(function(data) {
              let adjustData = []
              data.forEach(function(key) {
                adjustData.push(key.dataValues);
              });
              return resolve(adjustData);
              // return resolve(data);
            })
            .error(function(err) {
              if (err) return reject();
            });
        } else {
          return prototypes.findAll({}, function(err, data) {
            if (err) return reject();
            let adjustData = []
            data.forEach(function(key) {
              adjustData.push(key.dataValues);
            });
            return resolve(adjustData);
            // resolve(data);
          });
        }
      });
    },

    retriveAllTemplatesPrototypes: function(sort, offset, limit) {

      return new Promise(function(resolve, reject) {
        if (typeof(offset) === 'number' && sort && limit) {
          var order = '';
          Object.keys(sort).forEach(function(key) {
            if (sort[key] < 0) {
              order = sort[key] + ' DESC';
            } else {
              order = sort[key] + ' ASC';
            }
          });

          return
            prototypes
            .findAll({
              where: { isTemplate: true, isActive: true },
              order: order,
              limit: limit,
              offset: offset,
            })
            .success(function(data) {
              let adjustData = []
              data.forEach(function(key) {
                adjustData.push(key.dataValues);
              });
              return resolve(adjustData);
              // return resolve(data);
            })
            .error(function(err) {
              if (err) return reject();
            });
        } else {
          return prototypes
            .findAll({
              where: {
                isTemplate: true,
                isActive: true,
              },
            })
            .success(function(data) {
              let adjustData = []
              data.forEach(function(key) {
                adjustData.push(key.dataValues);
              });
              return resolve(adjustData);
              // return resolve(data);
            })
            .error(function(err) {

              if (err) return reject();
            });
        }
      });
    },

    addNewPrototype: function(field) {
      field.isPublic = false;
      // field.createdAt = new Date().getTime();
      // field.updatedAt = new Date().getTime();
      field.fwId = '';
      field.isActive = true;
      field.prototypeId = shortid.generate();
      field.prototypeKey =  crypto
        .createHmac('sha256', configs.prototypeKey)
        .update(new Date().getTime().toString() + field.prototypeId)
        .digest('hex');;

      // var validataSchema = v.validate(field, schema);

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
          return prototypes.create(field)
          .success(function(data) {
            return resolve(data.dataValues);
          })
          .error(function(err) {
            if (err) return reject();
          });
        });
      // });
    },

    editPrototype: function(query, update) {
      // update.updatedAt = new Date().getTime();
      return new Promise(function(resolve, reject) {
        return prototypes
        .update(update, query)
        .success(function(num) {
          // if (err) return reject();
          resolve({ message: 'success' });
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    deletePrototype: function(query, update) {
      // update.updatedAt = new Date().getTime();
      return new Promise(function(resolve, reject) {
        return prototypes
        .update(update, query)
        .success(function(num) {
          return resolve({ message: 'success' });
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    exportPrototype: function(prototypeId) {
      return new Promise(function(resolve, reject) {
        return prototypes.findAll({
          where: {
            prototypeId: prototypeId,
            isActive: true,
          },
        })
        .success(function(data) {
          if (data.length != 1) {
            return reject({ error: 'This prototypeId is not valid.' });
          }
          let adjustData = []
          data.forEach(function(key) {
            adjustData.push(key.dataValues);
          });
          return resolve(adjustData);
          // return resolve(data);
        })
        .error(function(err) {
          if (err) return reject();
        });
      })
      .then(function(data) {
        var field = {};
        field.prototypeName = data[0].prototypeName;
        field.version = data[0].version;
        field.prototypeDescription = data[0].prototypeDescription;
        field.prototypeImageURL = data[0].prototypeImageURL;
        // field.prodAppTypeId = 62;
        // field.prodRlsStatusTypeId = 1;
        // field.saleReleaseDate = null;
        // field.saleDiscontinuousDate = null;
        // field.isLongConnectionNeeded = true;
        // field.isSerialNeeded = false;
        // field.isInterpreterCloudNeeded = false;
        field.isActive = true;
        field.isPublic = false;
        // field.prodDesc = null;
        // field.developmentNote = null;
        // field.chipId= 4;
        // field.triggerActions= [];
        return new Promise(function(resolve, reject) {
          return resolve(field);
        });
      });
    },

    importPrototype: function(field, userId, isMCSLite) {
      var _this = this;
      // return new Promise(function(resolve, reject) {
      //   var validataSchema;

      //   if (isMCSLite) {
      //     validataSchema = v.validate(field, mcsLitePrototypeSchema);
      //   } else {
      //     validataSchema = v.validate(field, mcsOnlinePrototypeSchema);
      //   }

      //   if (validataSchema.errors.length === 0) {
      //     return resolve();
      //   } else {
      //     return reject({ schema: validataSchema.errors })
      //   }
      // })
      // .then(function() {
        var clonePrototypeData = {};

        if (isMCSLite) {
          clonePrototypeData.prototypeName = field.prototypeName;
          clonePrototypeData.version = field.version;
          clonePrototypeData.prototypeDescription = field.prototypeDescription || '';
          clonePrototypeData.prototypeImageURL = field.prototypeImageURL || '';
        } else {
          clonePrototypeData.prototypeName = field.prodName;
          clonePrototypeData.version = field.version;
          clonePrototypeData.prototypeDescription = field.description || '';
          clonePrototypeData.prototypeImageURL = '';
        }

        clonePrototypeData.isTemplate = false;
        clonePrototypeData.createUserId = userId;
        return _this.addNewPrototype(clonePrototypeData);
      // });
    },

    clonePrototype: function(prototypeId, data) {
      var field = {};
      field.isPublic = false;
      // field.createdAt = new Date().getTime();
      // field.updatedAt = new Date().getTime();
      field.isActive = true;
      field.fwId = '';
      field.isTemplate = false;
      field.prototypeId = shortid.generate();
      field.prototypeKey =  crypto
        .createHmac('sha256', configs.prototypeKey)
        .update(new Date().getTime().toString() + field.prototypeId)
        .digest('hex');;
      field.prototypeName = data.prototypeName || '';
      field.prototypeImageURL = data.prototypeImageURL || '';
      field.prototypeDescription = data.prototypeDescription || '';
      field.createUserId = data.userId;
      field.version = data.version  || '';
      // var validataSchema = v.validate(field, schema);

      return new Promise(function(resolve, reject) {
        return prototypes
        .find({
          where: {
            prototypeId: prototypeId,
            isActive: true,
          },
        })
        .success(function(data) {
          // if (err) return reject();
          if (data === null) {
            return reject({ error: 'This prototypeId is not valid.' });
          }
          return resolve([data.dataValues]);
        })
        .error(function(err) {
          return reject();
        });
      })
      .then(function(data) {
        // field.prototypeImageURL = data[0].prototypeImageURL || '';
        // field.version = data[0].version || '';

      //   return new Promise( function(resolve, reject) {
      //     /* validate schema */
      //     var validataSchema = v.validate(field, schema);

      //     if (validataSchema.errors.length === 0) {
      //       return resolve();
      //     } else {
      //       return reject({ schema: validataSchema.errors })
      //     }
      //   })
      // })
      // .then(function(data) {
        return new Promise(function(resolve, reject) {
          return prototypes
          .create(field)
          .success(function(data) {
            return resolve(data.dataValues);
          })
          .error(function(err) {
            return reject();
          })
        });
      })
    },

    clearAllPrototypes: function() {
      return new Promise(function(resolve, reject) {
        return prototypes
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
