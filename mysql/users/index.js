// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');
var shortid = require('shortid');
var crypto = require('crypto');
var secretKey = require('../../configs/rest').secretKey;

module.exports = function(users) {
  return {
    // validateSchema: function(object) {
    //   return v.validate(object, schema);
    // },
    changePassword: function(userId, password) {
      password = crypto
        .createHmac('sha256', secretKey)
        .update(password)
        .digest('hex');

      return new Promise(function(resolve, reject) {
        return users
        .update({
          password: password
        }, {
          userId: userId,
          isActive: true,
        })
        .success(function(num) {
          return resolve({ message: 'success' });
        })
        .error(function() {
          if (err) return reject();
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
        return users
        .find({ where: query })
        .success(function(data) {
          if (data !== null) {
            return resolve(data.dataValues);
          } else {
            return reject({ error: 'email / password is incorrect.' });
          }
        })
        .error(function(err) {
          if (err) {
            return reject(err);
          }
        })
      });
    },

    isRegistered: function isRegistered(email) {
      return new Promise(function(resolve, reject) {
        return users
          .find({ where: { email: email } })
          .success(function(data) {
            if (data === null) {
              return resolve({
                email: email,
                exist: false,
              });
            }

            return resolve({
              email: email,
              exist: true,
            });
          })
          .error(function(err) {
            return reject(err);
          });
      });
    },

    addNewUser: function(field) {
      field.userId = shortid.generate();
      // field.createdAt = new Date().getTime();
      // field.updatedAt = new Date().getTime();
      field.isActive = true;
      field.userImage = '';
      field.password = crypto
        .createHmac('sha256', secretKey)
        .update(field.password)
        .digest('hex');

      return new Promise( function(resolve, reject) {
        return users.find({
          where: {
            email: field.email,
          },
        })
        .success(function(data) {
          if (data === null) {
            return resolve();
          } else {
            return reject({ error: 'This email was registed!' });
          }
        })
        .error(function(err) {
          if (err) {
            return reject(err);
          }
        });
      })
      .then(function() {
        /* inser into database */
        return new Promise(function(resolve, reject) {
          return users
          .create(field)
          .success(function(data) {
            return resolve(data.dataValues);
          })
          .error(function(err) {
            if (err) return reject();
          });
        });
      });
    },

    retrieveUserList: function() {
      return new Promise(function(resolve, reject) {
        return users.findAll({})
        .success(function(data) {
          return resolve(data);
        })
        .error(function(err) {
          if (err) return reject();
        })
      });
    },

    checkIsAdmin: function(userId, isMiddleware) {
      return new Promise(function(resolve, reject) {
        return users.find({
          where: {
            userId: userId,
            isAdmin: true,
            isActive: true
          }
        })
        .success(function(data) {

          if (isMiddleware) {
            if (data === null) {
              return resolve([]);
            }
            return resolve([data.dataValues]);
          }

          if (data === null) {
            return reject({ error: 'This user is not admin!' });
          } else {
            return resolve(data);
          }
        })
        .error(function(err) {
          if (err) return reject();
        })
      });
    },

    checkDefaultUserCount: function() {
      return new Promise(function(resolve, reject) {
        return users.find({
          where: {
            isActive: true,
          },
        })
        .success(function(data) {
          if (data) {
            return resolve(false);
          } else { // data === null
            return resolve(true);
          }
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    changeUserToAdmin: function(email, isAdmin) {
      return new Promise(function(resolve, reject) {
        return users.update({ isAdmin: isAdmin }, {
          email: email,
          isActive: true,
        })
        .success(function(num) {
          return resolve({ message: 'success' });
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    retrieveOneUser: function(query) {
      return new Promise(function(resolve, reject) {
        return users
        .find({ where: query })
        .success(function(data) {
          if (data !== null) {
            return resolve([data.dataValues]);
          } else {
            return resolve([]);
          }
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    // TODO: retrieve user by query with MySQL, this function is now identity of retrieveUserList
    retrieveUserByQuery: function(query, sort, skip, limit) {
      return retrieveUserList();
    },

    editUser: function(query, update) {
      return new Promise(function(resolve, reject) {
        return users
        .update(update, query)
        .success(function(num) {
          return resolve({ message: 'success' });
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    clearAllUser: function() {
      return new Promise(function(resolve, reject) {
        return users
          .destroy({ isAdmin: false })
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
