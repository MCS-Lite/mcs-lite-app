var Datastore = require('nedb');
var db = new Datastore({ filename: './db/database.db' });
var devices = require('./devices/index');
var datapoints = require('./datapoints/index');
var prototypes = require('./prototypes/index');
var users = require('./users/index');

var $devices = new Datastore({ filename: './db/devices.json', autoload: true});
var $prototypes = new Datastore({ filename: './db/prototypes.json', autoload: true});
var $users = new Datastore({ filename: './db/users.json', autoload: true});
var $datapoints = new Datastore({ filename: './db/datapoints.json', autoload: true});

function init(host, port, config) {
  return {
    prototypes: new prototypes($prototypes),
    devices: new devices($devices),
    datapoints: new datapoints($datapoints, $devices),
    users: new users($users),
  };
};

module.exports = {
  init: init,
};