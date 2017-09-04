// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');
var shortid = require('shortid');
var crypto = require('crypto');
// var secretKey = require('../../configs/rest').secretKey;

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
          where: {
            userId: userId,
            isActive: true,
          },
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
        .success(function(err, data) {
          if (data.length === 1) {
            return resolve(data[0]);
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
        /* find same email or not */
        return new Promise( function(resolve, reject) {
          return users.find({
            where: { 
              email: field.email,
            },
          }, function(err, data) {
            if (err) {
              return reject(err);
            }
            if (data.length === 0) {
              return resolve();
            } else {
              return reject({ error: 'This email was registed!' });
            }
          });
        // });
      })
      .then(function() {
        /* inser into database */
        return new Promise(function(resolve, reject) {
          return users
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
            return resolve(data);
          }

          if (data.length != 1) {
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
          if (data.length !== 0) {
            return resolve(false);  
          }
          return resolve(true);  
        })
        .error(function(err) {
          if (err) return reject();          
        });
      });
    },

    changeUserToAdmin: function(email, isAdmin) {
      return new Promise(function(resolve, reject) {
        return users.update({ isAdmin: isAdmin }, {
          where: {
            email: email,
            isActive: true,  
          }
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
        .find(query)
        .success(function(data) {
          return resolve(data);
        })
        .error(function(err) {
          if (err) return reject();
        });
      });
    },

    editUser: function(query, update) {
      return new Promise(function(resolve, reject) {
        return users.update(update, { where: query })
        .success(function(num) {
          return resolve({ message: 'success' });
        })
        .error(function(err) {
          if (err) return reject();          
        });
      });
    },
  };
}
