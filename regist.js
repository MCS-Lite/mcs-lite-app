var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
var $rest = require('./configs/rest');

module.exports = function () {
  websocketServer.init();
  restServer.listen($rest.port);
}
