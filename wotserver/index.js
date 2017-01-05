const api = require('./api/index');
const db = require('../configs/db');
const websocketServer = require('./lib/websocket-broker');

var onmessage = function(payload) {
  // var obj = JSON.parse(payload.data);
  // var paths = payload.pathname.split('/');
  // console.log(paths);
  // var deviceId = paths[2];
  api.init(db).import(payload);
  console.log(payload);
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