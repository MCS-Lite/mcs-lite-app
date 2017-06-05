var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
var $rest = require('./configs/rest');
var $wot = require('./configs/wot');
var kill = require('kill-port');

global.stopMCSLiteService = function () {
  restServer.stop();
  kill($wot.port);
};

module.exports = function () {
  websocketServer.init();
  restServer.listen($rest.port);
}
