var connectMultiparty = require('connect-multiparty');
var bodyParser = require('body-parser');

module.exports = function($db, $app, $admin) {

  var webClientId = $admin.webClient.clientId;
  var webClientSecret = $admin.webClient.secret;
  var webBasicToken = new Buffer(webClientId + ':' + webClientSecret).toString('base64');

  var usersController = new require('../controllers/users')($db);
  
  const parseBasicToken = function(req, res, next) {
    if (/mobile/.test(req.route.path)) {
      req.basicToken = mobileBasicToken;
      req.clientAppInfo = {
        isMobile: true,
        redirect: $admin.mobileClient.redirect,
      };
    } else {
      req.basicToken = webBasicToken;
      req.clientAppInfo = {
        isMobile: false,
        redirect: $admin.webClient.redirect,
      };
    }
    next();
  };

  this.test = {
    path: '/test',
    methods: ['get'],
    handler: function(req, res, next) {
      res.send(200, { aaa: '123' });
    },
  };

  this.userLoginInterface = {
    path: '/login',
    methods: ['get'],
    handler: usersController.loginInterface,
  };

  this.authLogin = {
    path: '/oauth/login',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: usersController.login,
  };

  this.checkCookies = {
    path: '/oauth/cookies',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: usersController.checkCookies,
  };

};
