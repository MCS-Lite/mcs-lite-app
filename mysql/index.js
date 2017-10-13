var Sequelize = require('sequelize');
var dbConfig = require('../configs/db.json');
var sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
  }
);

var $users = sequelize.define('users', require('./users/schema'));
var $devices = sequelize.define('devices', require('./devices/schema'));
var $datapoints = sequelize.define('datapoints', require('./datapoints/schema'));
var $prototypes = sequelize.define('prototypes', require('./prototypes/schema'));
var $datachannels = sequelize.define('datachannels', require('./datachannels/schema'));
var $unittypes = sequelize.define('unittypes', require('./unittypes/schema'));

var users = require('./users/index')($users);
var devices = require('./devices/index')($devices);
var datapoints = require('./datapoints/index')($datapoints, $devices);
var prototypes = require('./prototypes/index')($prototypes);
var datachannels = require('./datachannels/index')($datachannels, $prototypes);
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
