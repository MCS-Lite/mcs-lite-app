var jwt = require('jsonwebtoken');
var request = require('superagent');

/* config */
var $oauth = require('../../configs/oauth');
var $rest = require('../../configs/rest');
var $wot = require('../../configs/wot');


module.exports = function ($db) {
  var users = $db.users;

  var signUp = function(req, res, next) {

    return new Promise(function(resolve, reject) {
      if (!req.body.email || !req.body.password || !req.body.userName) {
        return reject('Email or password or userName is not define.');
      }
      return resolve();
    })
    .then(function(){

      var data = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      };

      if (req.body.passwordAgain !== req.body.password) {
        throw('Twice password is not same.');
      }

      return new Promise(function(resolve, reject) {
        return request
        .post(host + '/users/regist')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/json')
        .send(data)
        .end(function(err, res) {
          return res.ok ?  resolve(res.body) : reject(err.response.body.error);
        });
      });
    })
    .then(function(data) {
      if (process.env.NODE_ENV === 'dev') {
        return res.redirect('http://127.0.0.1:8081/login');
      }
      return res.redirect('/login');

    })
    .catch(function(err) {
      if (process.env.NODE_ENV === 'dev') {
        return res.redirect('http://127.0.0.1:8081/signup?errorMsg=' + encodeURI(err));
      }
      return res.redirect('/signup?errorMsg=' + encodeURI(err));
    });
  };

  var login = function(req, res, next) {
    return new Promise(function(resolve, reject) {
      if (!req.body.email || !req.body.password) {
        return reject('You don\'t input the Email or Password.');
      }
      return resolve();
    })
    .then(function() {
      var data = {
        email: req.body.email,
        grant_type: 'password',
        password: req.body.password
      };

      return new Promise(function(resolve, reject) {
        request
        .post(oauthHost + '/oauth/token')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(data)
        .set('Authorization', 'Basic ' + req.basicToken)
        .end(function(err, res) {
          var errMsg;
          if (err) {
            if(err.response.body.error_description.code === 401) {
              errMsg = 'Email or password is not correct.';
            } else {
              errMsg = err.response.body.message;
            }
          }
          return res.ok ?  resolve(res.body) : reject(errMsg);
        });
      });
    }).then(function(data) {
      var payload = {
        token: data
      };
      try {
        var token = jwt.sign(payload, $oauth.JWT_SECRET);
      } catch (err) {
        return next(err);
      }

      res.cookie('token', token, { maxAge: $rest.session.maxAge });

      return new Promise(function(resolve, reject) {
        request
        .get(oauthHost + '/oauth/users/info')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + data.access_token)
        .end(function(err, data) {
          if (data.ok) {
            if (process.env.NODE_ENV === 'dev') {
              if(req.clientAppInfo.isMobile) {
                return res.redirect(req.clientAppInfo.redirect.dev + '/devices');
              }
              return res.redirect(req.clientAppInfo.redirect.dev + '/dashboard');
            }
            if(req.clientAppInfo.isMobile) {
              return res.redirect(req.clientAppInfo.redirect.prod + '/devices');
            }
            return res.redirect('/dashboard');
          } else {
            reject(err.response.body.message);
          }
        });
      });
    }).catch(function(err) {
      console.log(err);
      if (err === 'Your account is not activated yet!') {
        return res.redirect('/user/' + req.locale + '/verify?email=' + req.body.email);
      } else {
        if(req.clientAppInfo.isMobile) {
          return res.redirect('/mobile/login?errorMsg=' + encodeURI(err));
        } else {
          if (process.env.NODE_ENV === 'dev') {
            return res.redirect('http://127.0.0.1:8081/login?errorMsg=' + encodeURI(err));
          }
          return res.redirect('/login?errorMsg=' + encodeURI(err));
        }
      }
    });
  };

  var checkCookies = function(req, res, next) {
    var info = {};
    return new Promise(function(resolve, reject) {
      /* 檢查cookie中的token是否合法 */
      jwt.verify(req.body.token, $oauth.JWT_SECRET, function(err, payload) {
        return err ? reject(err) : resolve(payload.token);
      });

    }).then(function(token) {
      /* 帶去 Oauth 檢查 */
      var data = {
        refresh_token: token.refresh_token,
        grant_type: 'refresh_token'
      };

      return new Promise(function(resolve, reject) {
        request
        .post(oauthHost + '/oauth/token')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(data)
        .set('Authorization', 'Basic ' + req.basicToken)
        .end(function(err, res) {
          return res.ok ?  resolve(res.body) : reject(err.response.body.message);
        });
      });

    }).then(function(token) {
      /* 去抓 user info */
      return new Promise(function(resolve, reject) {
        request
        .get(oauthHost + '/oauth/users/info')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token.access_token)
        .end(function(err, res) {
          if (res.ok) {
            info.access_token = token.access_token;
            info.expire_time  = token.expire_time;
            info.userId       = res.body.userId;
            info.email       = res.body.email;
            info.isAdmin     = res.body.isAdmin;

            var payload = {
              token: token
            };

            var _token = jwt.sign(payload, $oauth.JWT_SECRET);
            info.token  = _token;

            return resolve(info);
          } else {
            return reject({
              code: err.response.body.code,
              message: err.response.body.message,
              token: token,
            });
          }
        });
      });
    }).then(function(info) {
      return users.retrieveOneUser({ userId: info.userId})
    })
    .then(function(foundUsers) {
      if (foundUsers.length != 0) {
        info.userName = foundUsers[0].userName;
        info.userImage = foundUsers[0].userImage;
        return res.send(200, {
          results: info
        });
      } else {
        return res.send(401, { message: 'Cannot find this userId' });
      }
    }).catch(function(err) {
      return res.send(401, {
        error: err,
        message: 'token is invalid.',
      });
    });
  };

  var loginInterface = function(req, res, next) {
    if (req.cookies.token) {
      return new Promise(function(resolve, reject) {
        /* 解碼 cookie 內的 token */
        jwt.verify(req.cookies.token, $oauth.JWT_SECRET, function(err, payload) {
          return err ? reject(err) : resolve(payload.token);
        });

      }).then(function(token) {

        req.body.token = token;
        return new Promise(function(resolve, reject) {
          /* 檢查 token 是否 active */
          request
          .get(oauthHost + '/oauth/users/info')
          .set('Cache-Control', 'no-cache')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token.access_token)
          .end(function(err, res) {
            return res.ok ? resolve('active') : reject({
              code: err.response.body.code,
              message: err.response.body.message,
              token: token
            });
          });

        }).then(function(data) {

          return data;

        }).catch(function(err) {

          var data = {
            refresh_token: token.refresh_token,
            grant_type: 'refresh_token'
          };
          /* 若非 active 則拿 refreshtoken 重新洗新的 token  */
          return new Promise(function(resolve, reject) {
            request
            .post(oauthHost + '/oauth/token')
            .set('Cache-Control', 'no-cache')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(data)
            .set('Authorization', 'Basic ' + req.basic_token)
            .end(function(err, res) {
              return res.ok ?  resolve(res.body) : reject(err.response.body.message);
            });
          });
        });
      }).then(function(data) {

        if (data !== 'active') {
          /* 如果非 active，就會把這些製作好的 token 塞入 cookie 中 */
          var payload = {
            token: data
          };
          var token = jwt.sign(payload, $oauth.JWT_SECRET);
          res.cookie('token', token, { maxAge: $rest.session.maxAge });
        }

        if (process.env.NODE_ENV === 'dev') {
          if (req.clientAppInfo.isMobile) {
            return res.redirect(req.clientAppInfo.redirect.dev + '/devices');
          }
          return res.redirect(req.clientAppInfo.redirect.dev + '/dashboard');
        }
        return res.render('app/build/index.html', { wsPort: $wot.port });

      }).catch(function(err) {
        /* 有任何錯誤就返回首頁 */
        res.clearCookie('token', { path: '/' });
        if (process.env.NODE_ENV === 'dev') {
          return res.redirect(req.clientAppInfo.redirect.dev + '/login');
        }

        return res.render('app/build/index.html', { wsPort: $wot.port });
      });
    } else {
      /* 如果 cookie 沒有 token 就是以前未登入過狀態 */
      if (process.env.NODE_ENV === 'dev') {
        if (req.query.errorMsg) {
          return res.redirect(req.clientAppInfo.redirect.dev + '?errorMsg=' + req.query.errorMsg);
        }
        return res.redirect(req.clientAppInfo.redirect.dev + '/');
      }

      return res.render('app/build/index.html', { wsPort: $wot.port });
    }
  };

  var registUser = function(req, res, next) {
    return users.addNewUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    })
    .then(function(data) {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveUserList = function(req, res, next) {
    var userId = req.user.userId;
    return users.checkIsAdmin(userId)
    .then(function() {
      return users.retrieveUserList();
    })
    .then(function(data) {
      return res.send(200, data);
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editUser = function(req, res, next) {
    var userId = req.user.userId;

    return users.editUser({
      userId: userId,
      isActive: true,
    }, {
      userName: req.body.userName,
    })
    .then(function() {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var changePassword = function(req, res, next) {
    var userId = req.user.userId;
    var password = req.body.password;
    return users.changePassword(userId, password)
    .then(function() {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });

  };

  return {
    registUser: registUser,
    retrieveUserList: retrieveUserList,
    login: login,
    signUp: signUp,
    loginInterface: loginInterface,
    checkCookies: checkCookies,
    editUser: editUser,
    changePassword: changePassword,
  };
};
