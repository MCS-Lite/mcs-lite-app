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

function startNode(path) {
  var nodePath = 'node';

  if (process.env.NODE_ENV === 'dev' && /^win/.test(process.platform)) nodePath = global.__dirname + '\\node\\win32\\node.exe';
  if (process.env.NODE_ENV === 'dev' && /^darwin/.test(process.platform)) nodePath = global.__dirname + '/node/osx64/node';
  
  if (process.env.NODE_ENV != 'dev' && /^win/.test(process.platform)) {
    nodePath = nwDir + '\\node.exe';
  }

  if (process.env.NODE_ENV != 'dev' && process.platform === 'darwin') {
    var folderDir = require(global.__dirname + '/config').path;  
    nodePath = folderDir + '/node';
  }

  var lite_server = spawn(nodePath, [path]);

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
        startNode('./server');
      } else {
        var folderDir;
        try {
          folderDir = require(global.__dirname + '/config').path;
          startNode(folderDir + '/mcs-lite-app/server');
        } catch(e) {
          $("#app").innerHTML = "<p>Please click \"setup\" file to setup your env and reopen this mcs-lite-app.app.<p>";
        }
      }
    }
    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\mcs-lite-app';
      startNode(folderDir + '\\server');
    }
  }, 0);
}

global.startMCSLiteService = startMCSLiteService;

function initApp() {
  var adminServer;
  var $admin;
  setTimeout(function() {
    if (process.platform == "darwin") {
      if (process.env.NODE_ENV === 'dev') {
        adminServer = require('./adminServer/index');
        $admin = require('./configs/admin');
      } else {
        var folderDir = require(global.__dirname + '/config').path + '/mcs-lite-app';
        adminServer = require(folderDir + '/adminServer');
        $admin = require(folderDir + '/configs/admin');
      }
    }
    if (/^win/.test(process.platform)) {
      var folderDir = nwDir + '\\mcs-lite-app';
      adminServer = require(folderDir + '\\adminServer\\index');
      $admin = require(folderDir + '\\configs\\admin');
    }
     
    adminServer.listen($admin.port);
    var win = gui.Window.get();
    win.show();

    win.on('close', function(event) {
      var $rest, $wot, $stream, $admin;

      if (process.env.NODE_ENV === 'dev') {
        $rest = require('./configs/rest');
        $wot = require('./configs/wot');
        $stream = require('./configs/stream');
        $admin = require('./configs/admin');
      } else {
        if (/^win/.test(process.platform)) {
          var folderDir = nwDir + '\\mcs-lite-app\\configs';
          $rest = require(folderDir + '\\rest');
          $wot = require(folderDir + '\\wot');
          $stream = require(folderDir + '\\stream');
          $admin = require(folderDir + '\\admin');
        }
        if (process.platform === 'darwin') {
          var folderDir = require(global.__dirname + '/config').path + '/mcs-lite-app';
          $rest = require(folderDir + '/configs/rest');
          $wot = require(folderDir + '/configs/wot');
          $stream = require(folderDir + '/configs/stream');
          $admin = require(folderDir + '/configs/admin');
        }
      }
      var kill = require('kill-port');  
      kill($rest.port);
      kill($wot.port);
      kill($stream.serverPort);
      kill($stream.rtmpServerPort);
      win.close(true);
    });
    
    if (process.env.NODE_ENV === 'dev') {
      document.body.innerHTML += '<iframe frameborder="0" src="http://' + $admin.host + ':' + $admin.port + $admin.webClient.redirect.prod + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
      // document.body.innerHTML += '<iframe frameborder="0" src="' + $admin.webClient.redirect.dev + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
    } else {
      document.body.innerHTML += '<iframe frameborder="0" src="http://' + $admin.host + ':' + $admin.port + '/login' + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
    }
  }, 500);
}
