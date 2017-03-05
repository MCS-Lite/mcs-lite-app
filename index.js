var fs = require('fs');
var gui = require('nw.gui');
var path = require('path');
var nwPath = process.execPath;
var nwDir = path.dirname(nwPath);
var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
console.log(interfaces);
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses);
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
      if (process.env.NODE_ENV === 'dev') {
        var server = require('./regist')();
      } else {
        var folderDir = nwDir.replace(/Contents\/Versions[\-\/\. 0-9a-zA-Z]+/g, '');
        folderDir = folderDir.replace('mcs-lite-app.app/', '');
        folderDir += 'mcs-lite-app';
        var server = require(folderDir + '/server')();
      }
    }

    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\mcs-lite-app';
      var server = require(folderDir + '\\server')();
    }
  },2000);
}

