var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');
var R = require('ramda');
var shortid = require('shortid');
var crypto = require('crypto');
var secretKey = require('../../configs/rest').secretKey;

module.exports = function(users) {
  return {
    validateSchema: function(object) {
      return v.validate(object, schema);
    },
    changePassword: function(userId, password) {
      password = crypto
        .createHmac('sha256', secretKey)
        .update(password)
        .digest('hex');

      return new Promise(function(resolve, reject) {
        return users.update({
          userId: userId,
          isActive: true,
        }, {
          $set: { password: password }
        }, {
        }, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success' });
        });
      });
    },

    signInUser: function(email, password, admin) {
      // admin is for admin console login
      password = crypto
        .createHmac('sha256', secretKey)
        .update(password)
        .digest('hex');

      var query = {
        email: email,
        password: password,
        isActive: true,
      };

      if (admin) {
        query.isAdmin = true;
      }

      return new Promise( function(resolve, reject) {
        return users.find(query, function(err, data) {
          if (err) {
            return reject(err);
          }
          if (data.length === 1) {
            return resolve(data[0]);
          } else {
            return reject({ error: 'email / password is incorrect.' });
          }
        });
      });
    },

    isRegistered: function isRegistered(email) {
      return new Promise(function(resolve, reject) {
        return users.find({ email: email }, function(err, data) {
          if (err) return reject(err);
          else if (data.length === 0) {
            return resolve({
              email: email,
              exist: false,
            });
          }

          return resolve({
            email: email,
            exist: true,
          });
        });
      });
    },

    addNewUser: function(field) {
      field.userId = shortid.generate();
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();
      field.isActive = true;
      field.userImage = '';
      field.password = crypto
        .createHmac('sha256', secretKey)
        .update(field.password)
        .digest('hex');

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
        /* find same email or not */
        return new Promise( function(resolve, reject) {
          return users.find({ email: field.email }, function(err, data) {
            if (err) {
              return reject(err);
            }
            if (data.length === 0) {
              return resolve();
            } else {
              return reject({ error: field.email + ', This email was registed!' });
            }
          });
        });
      })
      .then(function() {
        /* inser into database */
        return new Promise(function(resolve, reject) {
          return users.insert(field, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        });
      });
    },

    retrieveUserList: function() {
      return new Promise(function(resolve, reject) {
        return users.find({}, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      });
    },

    retrieveUserByQuery: function(query, sort, skip, limit) {
      return new Promise(function(resolve, reject) {
        users
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(function(err, data) {
          if (err) return reject();
          return resolve(data);
        });
      });
    },
    retrieveAdminUsers: function(req, res, next) {
      return new Promise(function(resolve, reject) {
        return users
        .find({
          isAdmin: true,
          isActive: true
        }, function(err, data) {
          if (err) return reject();
          return resolve(data);
        });
      });
    },
    checkIsAdmin: function(userId, isMiddleware) {
      return new Promise(function(resolve, reject) {
        return users.find({ userId: userId, isAdmin: true, isActive: true }, function(err, data) {
          if (err) return reject();

          if (isMiddleware) {
            return resolve(data);
          }

          if (data.length != 1) {
            return reject({ error: 'This user is not admin!' });
          } else {
            return resolve(data);
          }
        });
      });
    },

    checkDefaultUserCount: function() {
      return new Promise(function(resolve, reject) {
        return users.find({
          isActive: true,
        }, function(err, data) {
          if (err) return reject();
          if (data.length !== 0) {
            return resolve(false);
          }
          return resolve(true);
        });
      });
    },

    changeUserToAdmin: function(email, isAdmin) {
      return new Promise(function(resolve, reject) {
        return users.update({
          email: email,
          isActive: true,
        }, {
          $set: { isAdmin: isAdmin }
        }, {
        }, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success' });
        });
      });
    },

    retrieveOneUser: function(query) {
      return new Promise(function(resolve, reject) {
        return users.find(query, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      });
    },

    deleteUser: function(query) {
      var queue = [];

      query.userId.forEach(function(key) {
        queue.push(
          new Promise(function(resolve, reject) {
            var _q = R.merge(query, { userId: key });

            return users.remove(_q, { multi: true }, function(err, data) {
              if (err) return reject();
              resolve(data);
            });
          })
        );
      });
      return Promise.all(queue);
    },

    editUser: function(query, update) {
      return new Promise(function(resolve, reject) {
        return users.update(query, { $set: update }, {}, function(err, num) {
          if (err) return reject();
          resolve({ message: 'success' });
        });
      });
    },

    clearAllUser: function() {
      return new Promise(function(resolve, reject) {
        return users.find({
          isAdmin: false,
          isActive: true,
        }, function(err, data) {
          if (err) return reject();
          resolve(data);
        })
      })
      .then(function(data) {
        var queue = [];
        data.forEach(function(k, i) {
          queue.push(
            new Promise(function(resolve, reject) {
              return users.remove({ userId: k.userId }, { multi: true }, function(err, data) {
                if (err) return reject();
                resolve(data);
              });
            })
          )
        });
        return Promise.all(queue);
      });
    },
  };
}
