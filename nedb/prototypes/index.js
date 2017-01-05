var Datastore = require('nedb');
var prototypes = new Datastore({ filename: './db/prototypes.json', autoload: true});
var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = {
  validateSchema: function(object) {
    return v.validate(object, schema);
  },

  retriveUserPrototypes: function(query, sort, skip, limit) {
    return new Promise(function(resolve, reject) {
      if (sort && skip && limit) {
        return
          prototypes
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
      if (sort && skip && limit) {
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
      if (sort && skip && limit) {
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
    field.prototypeId = '123123';
    field.prototypeKey = '123123';
    field.isPublic = false;
    field.isActive = false;
    field.createdAt = new Date().getTime();
    field.updatedAt = new Date().getTime();
    field.fwId = '';
    field.isActive = true;
    field.isTemplate = true;

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
    return new Promise(function(resolve, reject) {
      return prototypes.update(query, { $set: update }, {}, function(err, num) {
        console.log(num);
        if (err) return reject();
        resolve({ message: 'success' });
      });
    });
  },

  deletePrototype: function(updateContent, filter) {

  },
}