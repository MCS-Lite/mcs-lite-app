var Datastore = require('nedb');
var path = require('path');
var devices = require('./devices/index');
var datapoints = require('./datapoints/index');
var prototypes = require('./prototypes/index');
var datachannels = require('./datachannels/index');
var users = require('./users/index');
var unittypes = require('./unittypes/index');
var fs = require('fs');

var $devices = new Datastore({ filename: path.resolve(__dirname, '../db/devices.json'), autoload: true });
var $prototypes = new Datastore({ filename: path.resolve(__dirname, '../db/prototypes.json'), autoload: true });
var $users = new Datastore({ filename: path.resolve(__dirname, '../db/users.json'), autoload: true });
var $datapoints = new Datastore({ filename: path.resolve(__dirname, '../db/datapoints.json'), autoload: true });
var $datachannels = new Datastore({ filename: path.resolve(__dirname, '../db/datachannels.json'), autoload: true });
var $unittypes = new Datastore({ filename: path.resolve(__dirname, '../db/unittypes.json'), autoload: true });

function init(host, port, config) {
  return {
    prototypes: new prototypes($prototypes),
    devices: new devices($devices),
    datapoints: new datapoints($datapoints, $devices),
    users: new users($users),
    datachannels: new datachannels($datachannels, $prototypes),
    unittypes: new unittypes($unittypes),
    services: {
      clearAllData: function() {
        fs.writeFileSync(path.resolve(__dirname, '../db/datapoints.json'), '');
        fs.writeFileSync(path.resolve(__dirname, '../db/datachannels.json'), '');
        fs.writeFileSync(path.resolve(__dirname, '../db/devices.json'), '');
        fs.writeFileSync(path.resolve(__dirname, '../db/prototypes.json'), '');
      },
    },
  };
};

module.exports = {
  init: init,
};