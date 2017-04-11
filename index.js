var fs = require('fs');
var gui = require('nw.gui');
var path = require('path');
var nwPath = process.execPath;
var nwDir = path.dirname(nwPath);
var os = require('os');

var $ = function (selector) {
  return document.querySelector(selector);
}

var interfaces = os.networkInterfaces();
var addresses = [];
var addressesList = '';
console.log(interfaces);
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
            addressesList += '<li>' + address.address + '</li>';
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

var ipDOM = $("#ip");
ipDOM.innerHTML = '' + addressesList;

function initApp(){
  setTimeout(function(){
    if (process.platform == "darwin") {
      if (process.env.NODE_ENV === 'dev') {
        require('./regist')();
      } else {
        if (/^\/private/.test(nwDir)) {
          var folderDir;
          var server;
          try {
            folderDir = require(global.__dirname + '/config').path;
            server = require(folderDir + '/mcs-lite-app/server');
          } catch(e) {
            $("#status-title").innerHTML = "<p>Please click \"setup\" file to setup your env and reopen this mcs-lite-app.app.<p>";
            $("#ip-title").innerHTML = "";
            $("#ip").innerHTML = "";
          }
          server();
        } else {
          var folderDir = nwDir.replace(/Contents\/Versions[\-\/\. 0-9a-zA-Z]+/g, '');
          folderDir = folderDir.replace('mcs-lite-app.app/', '');
          folderDir += 'mcs-lite-app';
          require(folderDir + '/server')();
        }

      }
    }

    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\mcs-lite-app';
      require(folderDir + '\\server')();
    }


  },1000);
}

