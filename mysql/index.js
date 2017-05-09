var Sequelize = require('sequelize');
var sequelize = new Sequelize('mcs-lite', 'username', 'password');

var $users = sequelize.define('users', require('../users/schema')(Sequelize));
var $devices = sequelize.define('devices', require('../devices/schema')(Sequelize));
var $datapoints = sequelize.define('datapoints', require('../datapoints/schema')(Sequelize));
var $prototypes = sequelize.define('prototypes', require('../prototypes/schema')(Sequelize));
var $datachannels = sequelize.define('datachannels', require('../datachannels/schema')(Sequelize));
var $unittypes = sequelize.define('unittypes', require('../unittypes/schema')(Sequelize));

var users = require('./users/index')($users);
var devices = require('./devices/index')($devices);
var datapoints = require('./datapoints/index')($datapoints);
var prototypes = require('./prototypes/index')($prototypes);
var datachannels = require('./datachannels/index')($datachannels);
var unittypes = require('./unittypes/index')($unittypes);

function init(host, port, config) {
  return {
    prototypes: prototypes,
    devices: devices,
    datapoints: datapoints,
    users: users,
    datachannels: datachannels,
    unittypes: unittypes,
  };
};

module.exports = {
  init: init,
};
