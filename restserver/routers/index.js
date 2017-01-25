module.exports = function($db, $app) {

  var devicesController = new require('../controllers/devices')($db);
  var usersController = new require('../controllers/users')($db);
  var prototypesController = new require('../controllers/prototypes')($db);
  var datapointsController = new require('../controllers/datapoints')($db);
  var datachannelsController = new require('../controllers/datachannels')($db);

  this.test = {
    path: '/test',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: function(req, res, next) {
      res.send(200, '');
    },
  };

  this.userInfo = {
    path: '/users/info',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: function(req, res, next) {
      res.send(200, req.user);
    }
  };

  this.authLogin = {
    path: '/auth/login',
    methods: ['post'],
    handler: usersController.login,
  };

  this.checkCookies = {
    path: '/auth/cookies',
    methods: ['post'],
    handler: usersController.checkCookies,
  };

  this.userLoginInterface = {
    path: '/user/login',
    methods: ['get'],
    handler: usersController.loginInterface,
  };

  this.adminLoginInterface = {
    path: '/admin/login',
    methods: ['get'],
    handler: usersController.adminLoginInterface,
  };

  this.registUser = {
    path: '/users/regist',
    methods: ['post'],
    handler: usersController.registUser,
  };

  this.retrieveUserList = {
    path: '/users',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: usersController.retrieveUserList,
  };

  this.retrievePrototypeList = {
    path: '/prototypes',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.retrievePrototype,
  };

  this.retrievePrototypeDetail = {
    path: '/prototypes/:prototypeId',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.retrievePrototypeDetail,
  };

  this.addNewPrototype = {
    path: '/prototypes',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.addNewPrototype,
  };

  this.editPrototype = {
    path: '/prototypes/:prototypeId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.editPrototype,
  };

  this.addDataChannel = {
    path: '/prototypes/:prototypeId/datachannels',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: datachannelsController.addNewDatachannels,
  };

  this.editDataChannel = {
    path: '/prototypes/:prototypeId/datachannels/:datachannelId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: datachannelsController.editDatachannels,
  };

  this.retrieveDeviceList = {
    path: '/devices',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.retrieveDevice,
  };

  this.retrieveDeviceDetail = {
    path: '/devices/:deviceId',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.retrieveDeviceDetail,
  };

  this.addNewDevice = {
    path: '/devices',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.addNewDevice,
  };

  this.editNewDevice = {
    path: '/devices/:deviceId',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: devicesController.editNewDevice,
  };

  this.uploadDatapoint = {
    path: '/devices/:deviceId/datapoints',
    methods: ['post'],
    handler: datapointsController.uploadDatapoints,
  };

  this.retrieveDatachannelDatapoint = {
    path: '/devices/:deviceId/datapoints/datachannel/:datachannelId',
    methods: ['get'],
    handler: datapointsController.retrieveDatapoints,
  };
};
