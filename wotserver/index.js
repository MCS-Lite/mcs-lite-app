const api = require('./api/index');
const db = require('../configs/db');
const websocketServer = require('./lib/websocket-broker');

var connectToDB = require('../restserver/libs/index').connectToDB;
var dbConfig = require('../configs/db');

var connectDB = connectToDB(dbConfig).init();
var datapoints = connectDB.datapoints;

var onmessage = function(payload) {
  var path = payload.pathname;
  var deviceId = path.split('/')[2];
  var deviceKey = path.split('/')[4];

  return new Promise(function(resolve, reject) {
    var data = JSON.parse(payload.data);
    if (!data.data.updatedAt) {
      data.data.updatedAt = new Date().getTime();
    }
    resolve(data);
  })
  .then(function(data) {
    return datapoints.uploadDatapoint({
      deviceId: deviceId,
      deviceKey: deviceKey,
      datachannelId: data.datachannelId,
      data: data.data,
    });
  })
  .then(function(data) {
    console.log('success!');
  })
  .catch(function(err) {
    console.log(err);
  });
};

var onnewthing = function(thing) {
  var data = JSON.stringify(thing);
  console.log('<NEW_THING>: ' + data);
};

module.exports = {
  init: function() {
    websocketServer.start({
      onmessage: onmessage,
      onnewthing: onnewthing
    });
  }
}