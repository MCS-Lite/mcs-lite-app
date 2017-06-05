var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
var adminServer = require('./adminServer/index');
var $rest = require('./configs/rest');
var $wot = require('./configs/wot');
var $admin = require('./configs/admin');
var kill = require('kill-port');

websocketServer.init();
restServer.listen($rest.port);
adminServer.listen($admin.port);

global.stopMCSLiteService = function () {
  restServer.stop();
  kill($wot.port);
};


