var connectMultiparty = require('connect-multiparty');

var $oauth = require('../../configs/oauth');

var webClientId = $oauth.webClient.clientId;
var webClientSecret = $oauth.webClient.secret;
var webBasicToken = new Buffer(webClientId + ':' + webClientSecret).toString('base64');

var mobileClientId = $oauth.mobileClient.clientId;
var mobileClientSecret = $oauth.mobileClient.secret;
var mobileBasicToken = new Buffer(mobileClientId + ':' + mobileClientSecret).toString('base64');

module.exports = function($db, $app, $rest) {

  var devicesController = new require('../controllers/devices')($db);
  var usersController = new require('../controllers/users')($db);
  var prototypesController = new require('../controllers/prototypes')($db);
  var datapointsController = new require('../controllers/datapoints')($db);
  var datachannelsController = new require('../controllers/datachannels')($db);
  var imageController = new require('../controllers/image')($db);
  var dashboardController = new require('../controllers/dashboard')($db);

  const parseBasicToken = function(req, res, next) {
    if (/mobile/.test(req.route.path)) {
      req.basicToken = mobileBasicToken;
      req.clientAppInfo = {
        isMobile: true,
        redirect: $oauth.mobileClient.redirect,
      };
    } else {
      req.basicToken = webBasicToken;
      req.clientAppInfo = {
        isMobile: false,
        redirect: $oauth.webClient.redirect,
      };
    }
    next();
  };

  this.client = {
    path: '/',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('app/build/index.html');
    },
  };

  this.prototypesInterface = {
    path: '/prototypes',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('app/build/index.html');
    },
  };

  this.signinInterface = {
    path: '/signin',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('app/build/index.html');
    },
  };

  this.prototypesDetailInterface = {
    path: '/prototypes/:prototypeId',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('app/build/index.html');
    },
  };

  this.devicesInterface = {
    path: '/devices',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('app/build/index.html');
    },
  };

  this.devicesDetailInterface = {
    path: '/devices/:deviceId',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('app/build/index.html');
    },
  };

  this.userLoginInterface = {
    path: '/login',
    methods: ['get'],
    handler: usersController.loginInterface,
  };

  this.test = {
    path: '/test',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: function(req, res, next) {
      res.send(200, '');
    },
  };

  this.userInfo = {
    path: '/oauth/users/info',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: function(req, res, next) {
      res.send(200, req.user);
    }
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

  this.authLoginMobile = {
    path: '/oauth/login/mobile',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: usersController.login,
  };

  this.checkCookiesMobile = {
    path: '/oauth/cookies/mobile',
    methods: ['post'],
    middleware: [parseBasicToken],
    handler: usersController.checkCookies,
  };

  this.signIn = {
    path: '/oauth/signin',
    methods: ['post'],
    handler: usersController.signIn,
  };

  this.registUser = {
    path: $rest.apiRoute + '/users/regist',
    methods: ['post'],
    handler: usersController.registUser,
  };

  this.retrieveUserList = {
    path: $rest.apiRoute + '/users',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.retrieveUserList,
  };

  this.editUser = {
    path: $rest.apiRoute + '/user',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.editUser,
  };

  this.retrievePrototypeList = {
    path: $rest.apiRoute + '/prototypes',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.retrievePrototype,
  };

  this.retrieveTemplatePrototypes = {
    path: $rest.apiRoute + '/prototypes/templates',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.retrievAllTemplates,
  };

  this.retrievePrototypeDetail = {
    path: $rest.apiRoute + '/prototypes/:prototypeId',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.retrievePrototypeDetail,
  };

  this.addNewPrototype = {
    path: $rest.apiRoute + '/prototypes',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.addNewPrototype,
  };

  this.editPrototype = {
    path: $rest.apiRoute + '/prototypes/:prototypeId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.editPrototype,
  };

  this.clonePrototype = {
    path: $rest.apiRoute + '/prototypes/:prototypeId/clone',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.clonePrototype,
  };

  this.deletePrototype = {
    path: $rest.apiRoute + '/prototypes/:prototypeId',
    methods: ['delete'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.deletePrototype,
  };

  this.addDataChannel = {
    path: $rest.apiRoute + '/prototypes/:prototypeId/datachannels',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: datachannelsController.addNewDatachannels,
  };

  this.editDataChannel = {
    path: $rest.apiRoute + '/prototypes/:prototypeId/datachannels/:datachannelId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: datachannelsController.editDatachannels,
  };

  this.retrieveDeviceList = {
    path: $rest.apiRoute + '/devices',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.retrieveDevice,
  };

  this.retrieveDeviceDetail = {
    path: $rest.apiRoute + '/devices/:deviceId',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.retrieveDeviceDetail,
  };

  this.addNewDevice = {
    path: $rest.apiRoute + '/devices',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.addNewDevice,
  };

  this.editDevice = {
    path: $rest.apiRoute + '/devices/:deviceId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.editDevice,
  };

  this.setPublicDevice = {
    path: $rest.apiRoute + '/devices/:deviceId/public',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.setPublicDevice,
  };

  this.deleteDevice = {
    path: $rest.apiRoute + '/devices/:deviceId',
    methods: ['delete'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.deleteDevice,
  };

  this.uploadDatapoint = {
    path: $rest.apiRoute + '/devices/:deviceId/datapoints',
    methods: ['post'],
    handler: datapointsController.uploadDatapoints,
  };

  this.retrieveDatachannelDatapoint = {
    path: $rest.apiRoute + '/devices/:deviceId/datapoints/datachannel/:datachannelId',
    methods: ['get'],
    handler: datapointsController.retrieveDatapoints,
  };

  this.retrieveUserDashBoard = {
    path: $rest.apiRoute + '/dashboard',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: dashboardController.dashboard,
  };

  this.uploadImage = {
    path: $rest.apiRoute + '/upload/image',
    methods: ['post'],
    middleware: [connectMultiparty],
    handler: imageController.uploadImage,
  };


};
