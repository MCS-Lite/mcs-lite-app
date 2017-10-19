var connectMultiparty = require('connect-multiparty');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function($db, $app, $admin) {

  var webClientId = $admin.webClient.clientId;
  var webClientSecret = $admin.webClient.secret;
  var webBasicToken = new Buffer(webClientId + ':' + webClientSecret).toString('base64');

  var usersController = new require('../controllers/users')($db);
  var serviceController = new require('../controllers/service')($db);

  const adminPathname = '../../node_modules/mcs-lite-admin-web/build';

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
    /**
   * Serving admin website via npm.
   * $npm i mcs-lite-admin-web --save
   * @author Michael Hsu
   */

  this.adminInterface = {
    path: '/admin/:type(ip|system|language|signup)',
    methods: ['get'],
    handler: function(req, res, next) {
      return res.render(path.resolve(__dirname, adminPathname, 'index.html'), function(err, html) {
        res.send(html);
      });
    },
  };

  this.loginInterface = {
    path: '/login',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: usersController.loginInterface,
  };

  this.userLoginInterface = {
    path: '/admin/login',
    methods: ['get'],
    middleware: [parseBasicToken],
    handler: usersController.loginInterface,
  };

  this.userSignupInterface = {
    path: '/admin/signup',
    methods: ['get'],
     handler: usersController.signupInterface,
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

  this.deleteUser = {
    path: $admin.apiRoute + '/users/:userId',
    methods: ['delete'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.deleteUser,
  };

  this.deleteUserByPost = {
    path: $admin.apiRoute + '/users/delete',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.deleteUser,
  };

  this.editUser = {  // Include disable User & changeUserPassword
    path: $admin.apiRoute + '/users/:userId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.editUser,
  };

  this.retrieveUsers = {
    path: $admin.apiRoute + '/users',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.retrieveUsers,
  };

  this.checkUserAvailable = {
    path: $admin.apiRoute + '/users/available',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.checkUserAvailable,
  };

  this.addNewUser = {
    path: $admin.apiRoute + '/users',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.addNewUser,
  };

  // this.addNewUserByCSV = {

  // };

  this.startService = {
    path: $admin.apiRoute + '/service/start',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: serviceController.startService,
  };

  this.stopService = {
    path: $admin.apiRoute + '/service/stop',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: serviceController.stopService,
  };

  this.retrieveServiceSetting = {
    path: $admin.apiRoute + '/service/:settingId',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: serviceController.retrieveServiceSetting,
  };

  this.editServiceSetting = {
    path: $admin.apiRoute + '/service/:settingId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: serviceController.editServiceSetting,
  };

  this.resetServiceSetting = {
    path: $admin.apiRoute + '/service/reset',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
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
    middleware: [$app.oauth.authorise()],
    handler: serviceController.getServiceIp,
  };

  this.getServiceLog = {
    path: $admin.apiRoute + '/log',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: serviceController.getServiceLog,
  };

  this.batchAddNewUserByCSV = {
    path: $admin.apiRoute + '/users.csv',
    methods: ['post'],
    middleware: [$app.oauth.authorise(), bodyParser.raw({ type: 'text/csv' })],
    handler: usersController.batchAddNewUserByCSV,
  };

  this.clearAllData = {
    path: $admin.apiRoute + '/clear',
    methods: ['delete'],
    middleware: [$app.oauth.authorise()],
    handler: serviceController.clearAllData,
  };

};
