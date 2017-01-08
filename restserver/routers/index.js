module.exports = function($db, $app) {

  var devicesController = new require('../controllers/devices')($db);
  var usersController = new require('../controllers/users')($db);
  var prototypesController = new require('../controllers/prototypes')($db);
  var datapointsController = new require('../controllers/datapoints')($db);

  this.test = {
    path: '/test',
    methods: ['get'],
    middleware: [$app.oauth.authorise()],
    handler: function(req, res, next) {
      res.send(200, '');
    },
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

  this.addDataChannel = {
    path: '/prototypes/:prototypeId/dataChannel',
    methods: ['post'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.addDataChannel,
  };

  this.editDataChannel = {
    path: '/prototypes/:prototypeId/dataChannel',
    methods: ['put'],
    middleware: [$app.oauth.authorise()],
    handler: prototypesController.editDataChannel,
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
    path: '/devices',
    methods: ['post'],
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
