var fs = require('fs');
var gui = require('nw.gui');
var path = require('path');
// var websocketServer = require('./wotserver/index');
// var restServer = require('./restserver/index');
// var $rest = require('./configs/rest');

/*  ws Server  */
/*

 for test
 node ./node_modules/wotcity.io/tests/websocket-send.js

*/

// websocketServer.init();
// restServer.listen($rest.port);

var nwPath = process.execPath;
var nwDir = path.dirname(nwPath);

if (process.platform == "darwin") {
  var menu = new gui.Menu({ type: 'menubar' });
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

gui.Window.get().show();


initApp();

function initApp(){
  setTimeout(function(){
    if (process.platform == "darwin") {
      ///Users/blue-mtk/mtk/mcs-lite-app/out/mcs-lite-app/osx64/mcs-lite-app.app/Contents/Versions/56.0.2924.87/nwjs Helper.app/Contents/MacOS
      var folderDir = nwDir.replace(/Contents\/Versions[\-\/\. 0-9a-zA-Z]+/g, '');
      folderDir = folderDir.replace('mcs-lite-app.app/', '');
      folderDir += 'mcs-lite-app';
      console.log(folderDir);

      var server = require(folderDir + '/server')();
    }

    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\mcs-lite-app';
      var server = require(folderDir + '\\server')();
    }
  },2000);
}

