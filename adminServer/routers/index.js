var connectMultiparty = require('connect-multiparty');
var bodyParser = require('body-parser');

module.exports = function($db, $app, $admin) {

  var webClientId = $admin.webClient.clientId;
  var webClientSecret = $admin.webClient.secret;
  var webBasicToken = new Buffer(webClientId + ':' + webClientSecret).toString('base64');

  var usersController = new require('../controllers/users')($db);
  var serviceController = new require('../controllers/service')($db);

  const parseBasicToken = function(req, res, next) {
    req.basicToken = webBasicToken;
    req.clientAppInfo = {
      isMobile: false,
      redirect: $admin.webClient.redirect,
    };
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

  this.startService = {
    path: '/service/start',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: serviceController.retrieveServiceSetting,
  };

  this.stopService = {
    path: '/service/stop',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: serviceController.retrieveServiceSetting,
 
  };

  this.retrieveServiceSetting = {
    path: '/service/:settingId',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: serviceController.retrieveServiceSetting,
  };

  this.editServiceSetting = {
    path: '/service/:settingId',
    methods: ['put'],
    middleware: [parseBasicToken],
    handler: serviceController.editServiceSetting,
  };

  this.resetServiceSetting = {
    path: '/service/:settingId/reset',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: serviceController.resetServiceSetting,
  };

  this.getServiceIp = {
    path: '/ip',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: serviceController.getServiceIp,
  };

  this.getServiceLog = {
    path: '/log',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: serviceController.getServiceLog,
  };

};
