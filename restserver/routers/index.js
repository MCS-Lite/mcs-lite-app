module.exports = function($db, $app, $rest) {

  var devicesController = new require('../controllers/devices')($db);
  var usersController = new require('../controllers/users')($db);
  var prototypesController = new require('../controllers/prototypes')($db);
  var datapointsController = new require('../controllers/datapoints')($db);
  var datachannelsController = new require('../controllers/datachannels')($db);

  this.client = {
    path: '/',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('index.html');
    },
  };

  this.prototypesInterface = {
    path: '/prototypes',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('index.html');
    },
  };

  this.prototypesDetailInterface = {
    path: '/prototypes/:prototypeId',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('index.html');
    },
  };

  this.devicesInterface = {
    path: '/devices',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('index.html');
    },
  };

  this.devicesDetailInterface = {
    path: '/devices/:deviceId',
    methods: ['get'],
    handler: function(req, res, next) {
      res.render('index.html');
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
    handler: usersController.login,
  };

  this.checkCookies = {
    path: '/oauth/cookies',
    methods: ['post'],
    handler: usersController.checkCookies,
  };

  this.adminLoginInterface = {
    path: '/admin/login',
    methods: ['get'],
    handler: usersController.adminLoginInterface,
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

  this.retrievePrototypeList = {
    path: $rest.apiRoute + '/prototypes',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.retrievePrototype,
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

  this.editNewDevice = {
    path: $rest.apiRoute + '/devices/:deviceId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.editNewDevice,
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
};
