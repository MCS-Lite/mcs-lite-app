var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
// var adminServer = require('./adminServer/index');
var $rest = require('./configs/rest');
// var $admin = require('./configs/admin');

websocketServer.init();
restServer.listen($rest.port);
// adminServer.listen($admin.port);
