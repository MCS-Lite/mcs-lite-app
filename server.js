var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');

websocketServer.init();
restServer.listen(3000);
