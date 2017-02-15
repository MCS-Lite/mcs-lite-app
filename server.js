var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
var $rest = require('./configs/rest');

websocketServer.init();
restServer.listen($rest.port);
