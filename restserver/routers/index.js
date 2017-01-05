module.exports = function($db) {

  var devicesController = new require('../controllers/devices')($db);
  var usersController = new require('../controllers/users')($db);
  var prototypesController = new require('../controllers/prototypes')($db);
  var datapointsController = new require('../controllers/datapoints')($db);

  this.registUser = {
    path: '/users',
    methods: ['post'],
    handler: usersController.registUser,
  };

  this.retrieveUserList = {
    path: '/devices',
    methods: ['get'],
    handler: usersController.retrieveUserList,
  };

  this.retrievePrototypeList = {
    path: '/prototypes',
    methods: ['get'],
    handler: prototypesController.retrievePrototype,
  };

  this.retrievePrototypeDetail = {
    path: '/prototypes/:prototypeId',
    methods: ['get'],
    handler: prototypesController.retrievePrototypeDetail,
  };

  this.addNewPrototype = {
    path: '/prototypes',
    methods: ['post'],
    handler: prototypesController.addNewPrototype,
  };

  this.addDataChannel = {
    path: '/prototypes/:prototypeId/dataChannel',
    methods: ['post'],
    handler: prototypesController.addDataChannel,
  };

  this.editDataChannel = {
    path: '/prototypes/:prototypeId/dataChannel',
    methods: ['put'],
    handler: prototypesController.editDataChannel,
  };

  this.retrieveDeviceList = {
    path: '/devices',
    methods: ['get'],
    handler: devicesController.retrieveDevice,
  };

  this.retrieveDeviceDetail = {
    path: '/devices/:deviceId',
    methods: ['get'],
    handler: devicesController.retrieveDeviceDetail,
  };

  this.addNewDevice = {
    path: '/devices',
    methods: ['post'],
    handler: devicesController.addNewDevice,
  };

  this.editNewDevice = {
    path: '/devices',
    methods: ['post'],
    handler: devicesController.editNewDevice,
  };

  this.uploadDatapoint = {
    path: '/devices/:deviceId/datapoints',
    methods: ['post'],
    handler: datapointsController.uploadDatapoints,
  };

  this.retrieveDatapoint = {
    path: '/devices/:deviceId/datapoints',
    methods: ['get'],
    handler: datapointsController.retrieveDatapoints,
  };

};
