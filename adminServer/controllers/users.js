var jwt = require('jsonwebtoken');
var request = require('superagent');
var path = require('path');

/* config */
var $admin = require('../../configs/admin');
const adminPathname = '../../node_modules/mcs-lite-admin-web/build';

module.exports = function ($db) {
  var users = $db.users;
  
  var signupInterface = function(req, res, next) {
    return res.render(path.resolve(__dirname, adminPathname, 'index.html'), function(err, html) {
      res.send(html);
    });
  };
  
  var loginInterface = function(req, res, next) {
    return users.checkDefaultUserCount()
    .then(function(status) {
      if (!status) {
        if (req.cookies.token) {
          return new Promise(function(resolve, reject) {
            /* 解碼 cookie 內的 token */
            jwt.verify(req.cookies.token, $admin.JWT_SECRET, function(err, payload) {
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
              var token = jwt.sign(payload, $admin.JWT_SECRET);
              res.cookie('token', token, { maxAge: $admin.session.maxAge });
            }

            if (process.env.NODE_ENV === 'dev') {
              return res.redirect(req.clientAppInfo.redirect.prod + '/');
            }

            return res.render(path.resolve(__dirname, adminPathname, 'index.html'), function(err, html) {
              res.send(html);
            });
            
          }).catch(function(err) {
            /* 有任何錯誤就返回首頁 */
            res.clearCookie('token', { path: '/' });

            if (process.env.NODE_ENV === 'dev') {
              return res.redirect(req.clientAppInfo.redirect.prod + '/login');
            }

            return res.render(path.resolve(__dirname, adminPathname, 'index.html'), function(err, html) {
              res.send(html);
            });
          });
        } else {
          /* 如果 cookie 沒有 token 就是以前未登入過狀態 */
          if (process.env.NODE_ENV === 'dev') {
            if (req.query.errorMsg) {
              return res.redirect(req.clientAppInfo.redirect.prod + '?errorMsg=' + req.query.errorMsg);
            }
            return res.redirect(req.clientAppInfo.redirect.prod + '/login');
          }

          return res.render(path.resolve(__dirname, adminPathname, 'index.html'), function(err, html) {
            res.send(html);
          });
        }
      } else {
        return res.redirect(req.clientAppInfo.redirect.prod + '/signup');
      }
    })
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
        var token = jwt.sign(payload, $admin.JWT_SECRET);
      } catch (err) {
        return next(err);
      }

      res.cookie('token', token, { maxAge: $admin.session.maxAge });

      return new Promise(function(resolve, reject) {
        request
        .get(oauthHost + '/oauth/users/info')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + data.access_token)
        .end(function(err, data) {
          if (data.ok) {
            // if (process.env.NODE_ENV === 'dev') {
            //   return res.redirect(req.clientAppInfo.redirect.prod + '/');
            // }
            return res.redirect(req.clientAppInfo.redirect.prod + '/');
          } else {
            reject(err.response.body.message);
          }
        });
      });
    }).catch(function(err) {
      if (process.env.NODE_ENV === 'dev') {
        return res.redirect('http://localhost:' + $admin.port + '/login?errorMsg=' + encodeURI(err));
      }
      // console.log(err);
      return res.redirect('/login?errorMsg=' + encodeURI(err));
    });
  };

  var checkCookies = function(req, res, next) {
    var info = {};
    return new Promise(function(resolve, reject) {
      /* 檢查cookie中的token是否合法 */
      jwt.verify(req.body.token, $admin.JWT_SECRET, function(err, payload) {
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

            var _token = jwt.sign(payload, $admin.JWT_SECRET);
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

  var createAnAdmin = function(req, res, next) {
    return users.checkDefaultUserCount()
    .then(function(status) {
      if (status) {
        return users.addNewUser({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          isAdmin: true,
        })
        .then(function(data) {
          return res.redirect('/login');
        })
        .catch(function(err) {
          return res.send(400, err);
        });
      } else {
        return res.send(400, "Cannot regist admin Account.");
      }
    });
  };

  var checkAdminExist = function(req, res, next) {
    return users.checkDefaultUserCount()
    .then(function(status) {
      res.send(200, status);
    });
  };

  var editUser = function(req, res, next) {
    if (req.body.password) {
      return users.changePassword(req.params.userId, req.body.password)
      .then(function(data) {
        return res.send(200, data);
      })
      .catch(function(err) {
        return res.send(400, err);
      });
    } else if (req.body.isActive) {
      return users.editUser({
        userId: req.params.userId, 
        isActive: true
      }, {
        isActive: req.body.isActive,
      })
      .then(function(data) {
        return res.send(200, data);
      })
      .catch(function(err) {
        return res.send(400, err);
      });
    }
  };

  var deleteUser = function(req, res, next) {
    var userId = req.params.userId.split(',');
    console.log(userId);
    return users.deleteUser({
      userId: userId, 
    })
    .then(function(data) {
      return res.send(200, "success.");
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var addNewUser = function(req, res, next) {
    return users.addNewUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    })
    .then(function(data) {
      return res.send(200, data);
    })
    .catch(function(err) {
      return res.send(400, err);
    })
  };

  var retrieveUsers = function(req, res, next) {
    var query = {
      isActive: true,
    };

    var userName = req.query.userName;
    var email = req.query.email;
    var q = req.query.q;

    if (q) {
      query['$or'] = [];
      query['$or'].push({email: { $regex: new RegExp(q)}});
      query['$or'].push({userName: { $regex: new RegExp(q)}});  
    }

    if (userName) {
      query.userName = { $regex: new RegExp(userName) };
    }

    if (email) {
      query.email = { $regex: new RegExp(email) };
    }
    
    var sort = req.query.sort;
    var skip = req.query.skip;
    var limit = req.query.limit;
    
    return users.retrieveUserByQuery(query, sort, skip, limit)
    .then(function(data) {
      return res.send(200, data);
    })
    .catch(function(err) {
      return res.send(400, err);
    });

  };

  return {
    login: login,
    loginInterface: loginInterface,
    checkCookies: checkCookies,
    retrieveUsers: retrieveUsers,
    createAnAdmin: createAnAdmin,
    checkAdminExist: checkAdminExist,
    signupInterface: signupInterface,
    editUser: editUser,
    deleteUser: deleteUser,
    addNewUser: addNewUser,
  };

}