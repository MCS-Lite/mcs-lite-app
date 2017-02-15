var fs = require('fs');
var gui = require('nw.gui');
var websocketServer = require('./wotserver/index');
var restServer = require('./restserver/index');
var $rest = require('./configs/rest');

/*  ws Server  */
/*

 for test
 node ./node_modules/wotcity.io/tests/websocket-send.js

*/

websocketServer.init();
restServer.listen($rest.port);

if (process.platform == "darwin") {
  var menu = new gui.Menu({ type: 'menubar' });
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

gui.Window.get().show();
