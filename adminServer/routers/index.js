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

  const redirectForDev = function(req, res, next) {
    if (process.env.NODE_ENV === 'dev') {
      return res.redirect($admin.webClient.redirect.dev);
    }
  };

  this.createAnAdmin = {
    path: $admin.apiRoute + '/admin',
    methods: ['post'],
    handler: usersController.createAnAdmin,
  };

  this.checkAdminExist = {
    path: $admin.apiRoute + '/admin/check',
    methods: ['get'],
    handler: usersController.checkAdminExist,
  };

  this.userLoginInterface = {
    path: '/login',
    methods: ['get'],
    middleware: [parseBasicToken],
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
    path: $admin.apiRoute + '/service/start',
    methods: ['get'],
    handler: serviceController.startService,
  };

  this.stopService = {
    path: $admin.apiRoute + '/service/stop',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: serviceController.stopService,
  };

  this.retrieveServiceSetting = {
    path: $admin.apiRoute + '/service/:settingId',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: serviceController.retrieveServiceSetting,
  };

  this.editServiceSetting = {
    path: $admin.apiRoute + '/service/:settingId',
    methods: ['put'],
    middleware: [parseBasicToken],
    handler: serviceController.editServiceSetting,
  };

  this.resetServiceSetting = {
    path: $admin.apiRoute + '/service/:settingId/reset',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: serviceController.resetServiceSetting,
  };

  this.userInfo = {
    path: '/oauth/users/info',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: function(req, res, next) {
      res.send(200, req.user);
    },
  };

  this.getServiceIp = {
    path: $admin.apiRoute + '/ip',
    methods: ['get'],
    // middleware: [parseBasicToken],
    handler: serviceController.getServiceIp,
  };

  this.getServiceLog = {
    path: $admin.apiRoute + '/log',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: serviceController.getServiceLog,
  };

};
