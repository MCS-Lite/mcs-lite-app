var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
// var adminServer = require('./adminServer/index');
var $rest = require('./configs/rest');
// var $admin = require('./configs/admin');
var server = restServer.listen($rest.port);

websocketServer.init(server);
// adminServer.listen($admin.port);
