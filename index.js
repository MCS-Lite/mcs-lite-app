var util = require('util');
global.logs = '';
global.console.log = function(x){
  global.logs += JSON.stringify(x) + '\n';
  process.stdout.write(util.format.apply(util, arguments));
}; 

var fs = require('fs');
var gui = require('nw.gui');
var path = require('path');
var nwPath = process.execPath;
var nwDir = path.dirname(nwPath);
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var $ = function (selector) {
  return document.querySelector(selector);
}

if (process.platform == "darwin") {
  var menu = new gui.Menu({ type: 'menubar' });
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

initApp();

// var ipDOM = $("#ip");
// ipDOM.innerHTML = '' + addressesList;

function startNode(path) {
  var lite_server = spawn('node', [path]);
  lite_server.stdout.on('data', function (data) {   
    console.log(data.toString());
  });
  lite_server.stderr.on('data', function (data) {   
    console.log(data.toString());  
  });
  lite_server.on('close', function (status) { 
    console.log("Terminal MCS Lite server:" + status);
  });
}

function startMCSLiteService() {
    setTimeout(function(){
    if (process.platform == "darwin") {
      if (process.env.NODE_ENV === 'dev') {
        // require('./regist')();
        startNode('./server');
      } else {
        if (/^\/private/.test(nwDir)) {
          var folderDir;
          // var server;
          try {
            folderDir = require(global.__dirname + '/config').path;
            // server = require(folderDir + '/mcs-lite-app/server');
            startNode(folderDir + '/mcs-lite-app/server');
            
            // exec('node ' + folderDir + '/mcs-lite-app/server.js');
          } catch(e) {
            // $("#status-title").innerHTML = "<p>Please click \"setup\" file to setup your env and reopen this mcs-lite-app.app.<p>";
            // $("#ip-title").innerHTML = "";
            // $("#ip").innerHTML = "";
          }
          // server();
        } else {
          var folderDir = nwDir.replace(/Contents\/Versions[\-\/\. 0-9a-zA-Z]+/g, '');
          folderDir = folderDir.replace('mcs-lite-app.app/', '');
          folderDir += 'mcs-lite-app';
          startNode(folderDir + '/server');
          // require(folderDir + '/server')();
        }
      }
    }
    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\mcs-lite-app';
      // folderDir + '/mcs-lite-app/server'
      startNode(folderDir + '\\server');
      // require(folderDir + '\\server')();
    }
  }, 0);
}

global.startMCSLiteService = startMCSLiteService;

function initApp() {
  var adminServer;
  setTimeout(function() {
    if (process.platform == "darwin") {
      // if (process.env.NODE_ENV === 'dev') {
        // var child = require('child_process');
        // child.exec('npm run watch:global', { cwd: './admin' });
      // }
      adminServer = require('./adminServer/index');
    }
    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\adminServer';
      adminServer = require(folderDir + '\\index');
    }
    var $admin = require('./configs/admin');
    adminServer.listen($admin.port);
    
    gui.Window.get().show();
    if (process.env.NODE_ENV === 'dev') {
      document.body.innerHTML += '<iframe frameborder="0" src="http://' + $admin.host + ':' + $admin.port + $admin.webClient.redirect.prod + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
      // document.body.innerHTML += '<iframe frameborder="0" src="' + $admin.webClient.redirect.dev + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
    } else {
      document.body.innerHTML += '<iframe frameborder="0" src="http://' + $admin.host + ':' + $admin.port + $admin.webClient.redirect.prod + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
    }
  }, 500);
}
