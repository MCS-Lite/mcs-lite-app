'use strict';
var jwt     = require('jsonwebtoken');

module.exports = function($db) {

  var $config  = require('../configs/oauth');
  var $clients = [];
  $clients.push($config.webClient);
  $clients.push($config.mobileClient);

  var Users = $db.users;
  var Apps = require('./libs/app');
  var $errors = require('./errors');

  var model   = {};

  model.generateToken = function(type, req, callback) {

    var payload = {
      type: type, /* accessToken or refreshToken */
      user: req.user,
      clientId: req.oauth.client.clientId
    };

    var token;
    try {
      if (type === 'accessToken') {
        token = jwt.sign(payload, $config.JWT_SECRET, { expiresIn: $config.ACCESS_TOKEN_EXP + 'm' });
      } else {
        token = jwt.sign(payload, $config.JWT_SECRET, { expiresIn: $config.REFRESH_TOKEN_EXP + 'm' });
      }
    } catch (err) {
      if (callback) { return callback(err); }
    }

    if (callback) {
      return callback(null, token);
    } else {
      return token;
    }
  };

  model.getAccessToken = function(bearerToken, callback) {
    jwt.verify(bearerToken, $config.JWT_SECRET, function(err, payload) {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        bearerToken: bearerToken,
        user: payload.user,
        expires: new Date(payload.exp * 1e3)
      });
    });
  };

  model.getRefreshToken = function(bearerToken, callback) {
    jwt.verify(bearerToken, $config.JWT_SECRET, function(err, payload) {
      if (err) {
        return callback(err);
      }
      /* returning null means token is invalid */
      return callback(null, {
        user: payload.user,
        clientId: payload.clientId,
        expires: new Date(payload.exp * 1e3)
      });
    });
  };

  model.getClient = function(clientId, clientSecret, callback) {
    Apps
    .find($clients, clientId, clientSecret)
    .then(function(data) {
      return callback(null, {
        clientId: data.clientId,
        clientSecret: data.clientSecret
      });
    })
    .catch(function(err) {
      if (err.message === 'clientId / clientSecret is invalid.') {
        return callback($errors["401"], {
          error: err.message,
          message: err.message,
        }, 'login');
      } else {
        return callback(err);
      }
    });
  };

  model.grantTypeAllowed = function(clientId, grantType, callback) {
    try {
      callback(null, true);
    } catch (err) {
      return callback(err);
    }
  };

  model.saveAccessToken = function(accessToken, clientId, expires, user, callback) {
    return callback(null, accessToken);
  };

  model.saveRefreshToken = function(refreshToken, clientId, expires, user, callback) {
    return callback(null, refreshToken);
  };

  model.getUser = function(email, password, callback) {
    Users.signInUser(email, password)
    .then(function(data) {
      callback(null, {
        isAdmin: data.isAdmin,
        userName: data.userName,
        email: data.email,
        userImage: data.userImage,
        userId: data.userId,
      });
    })
    .catch(function(err) {
      return callback($errors["401"], {
        error: err.message,
        message: err.message,
      }, 'login');
    });
  };

  return model;

};