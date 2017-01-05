var Datastore = require('nedb');
var db = new Datastore({ filename: './db/database.db' });
var devices = require('./devices/index');
var datapoints = require('./datapoints/index');
var prototypes = require('./prototypes/index');
var users = require('./users/index');

// db.loadDatabase(function (err) {    // Callback is optional
//   if (err) console.log(err);
// });

function init(host, port, config) {
  return {
    prototypes: prototypes,
    devices: devices,
    datapoints: datapoints,
    users: users,
  };
};

module.exports = {
  init: init,
};