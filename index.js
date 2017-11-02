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

var liteServer;

function startNode(serverPath) {
  var nodePath = 'node';

  if (process.env.NODE_ENV === 'dev' && /^win/.test(process.platform)) nodePath = global.__dirname + '\\node\\win32\\node.exe';
  // if (process.env.NODE_ENV === 'dev' && /^darwin/.test(process.platform)) nodePath = global.__dirname + '/node/osx64/node';

  if (process.env.NODE_ENV != 'dev' && /^win/.test(process.platform)) {
    nodePath = nwDir + '\\node.exe';
  }

  if (process.env.NODE_ENV != 'dev' && process.platform === 'darwin') {
    var folderDir = require(global.__dirname + '/config').path;
    nodePath = folderDir + '/node';
  }

  console.log("nodePath is " + nodePath);
  liteServer = spawn(nodePath, [serverPath]);

  liteServer.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  liteServer.stderr.on('data', function(data) {
    console.log(data.toString());
  });

  liteServer.on('close', function(status) {
    liteServer = null;
    console.log(`Terminal MCS Lite server: ${status}`);
  });
}

function startMCSLiteService() {
  return new Promise(function(resolve, reject) {
    if (liteServer || (liteServer && !liteServer.killed)) {
      return reject('MCS Lite service is still running');
    }

    if (process.platform === 'darwin') {
      if (process.env.NODE_ENV === 'dev') {
        startNode('./server');
      } else {
        let folderDir;
        try {
          folderDir = require(global.__dirname + '/config').path;
          startNode(folderDir + '/mcs-lite-app/server');
        } catch (e) {
          $("#app").innerHTML = "<p>Please click \"setup\" file to setup your env and reopen this mcs-lite-app.app.<p>";
        }
      }
    }

    if (/^win/.test(process.platform)) {
      const folderDir = nwDir + '\\mcs-lite-app';
      startNode(folderDir + '\\server');
    }

    console.log('MCS lite service is started.');
    return resolve('MCS lite service is started.');
  });
}

function stopMCSLiteService() {
  return new Promise(function(resolve, reject) {
    if (liteServer) {
      liteServer.on('close', function(status) {
        liteServer = null;
        console.log(`Terminal MCS Lite server: ${status}`);
        return resolve('MCS Lite service is stopped.');
      });

      liteServer.kill();
      setTimeout(function() {
        return reject('Stop request failed.');
      }, 2000);
    } else return reject('MCS Lite service is not running.');
  });
}

global.startMCSLiteService = startMCSLiteService;

global.stopMCSLiteService = stopMCSLiteService;

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
    var tray = new gui.Tray({
      icon: process.platform === 'darwin'
        ? 'icon_tray@2x.png'
        : 'icon_tray_windows.png',
      tooltip: 'MCS Lite',
    });
    var trayMenu = new gui.Menu();
    var showMenuItem = new gui.MenuItem({
      type: 'normal',
      click: function() {
        win.show();
        win.setShowInTaskbar(true);
      },
      label: 'Show Admin Window',
    });
    var quitMenuItem = new gui.MenuItem({
      type: 'normal',
      click: function() {
        quitApp();
      },
      label: 'Quit MCS Lite',
    });

    trayMenu.append(showMenuItem);
    trayMenu.append(quitMenuItem);

    tray.menu = trayMenu;

    win.show();

    function quitApp() {
      stopMCSLiteService();
      tray.remove();
      tray = null;
      win.close(true);
    }

    win.on('close', function(event) {
      win.hide();
      win.setShowInTaskbar(false);

      if (event === 'quit') {
        quitApp();
      }
    });

    if (process.env.NODE_ENV === 'dev') {
      document.body.innerHTML += '<iframe frameborder="0" src="http://' + $admin.host + ':' + $admin.port + '/login' + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
      // document.body.innerHTML += '<iframe frameborder="0" src="' + $admin.webClient.redirect.dev + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
    } else {
      document.body.innerHTML += '<iframe frameborder="0" src="http://' + $admin.host + ':' + $admin.port + '/login' + '" style="width: 100%; height: 580px; overflow: auto;" nwdisable nwfaketop>';
    }
  }, 500);
}
