var os = require('os');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var kill = require('cross-port-killer').kill;
var $rest = require('../../configs/rest');
var $wot = require('../../configs/wot');
var $stream = require('../../configs/stream');
var $admin = require('../../configs/admin');

var _stopService = function () {
  kill($rest.port);
  kill($wot.port);
  kill($stream.serverPort);
  kill($stream.rtmpServerPort);
};

module.exports = function ($db) {
  var users = $db.users;

  var startService = function(req, res, next) {
    global.startMCSLiteService();
    this.serviceStatus = true;
    return res.send(200, "success!");
  };

  var stopService = function(req, res, next) {
    _stopService();
    this.serviceStatus = false;
    return res.send(200, "success.");
  };

  var retrieveServiceSetting = function(req, res, next) {
    try {
      var configFilePath = path.resolve(__dirname, '../../configs/' + req.params.settingId + '.json');
      return fs.readFile(configFilePath, 'utf8', function(err, data) {
        if (err) throw err;
        return res.send(200, { data: JSON.parse(data) });
      });
    } catch (e) {
      res.send(400, "Cannot find this file.");
    }
  };

  var editServiceSetting = function(req, res, next) {
    var settingId = req.params.settingId;
    return new Promise(function(resolve, reject) {
      var content = req.body.content;
      return fs.writeFile(path.resolve(__dirname, '../../configs/' + req.params.settingId + '.json'), JSON.stringify(content, null, 4), function(err) {
        if (err) reject(err);
        resolve();
      });  
    })
    .then(function() {
      return res.send(200, "success.");
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var resetServiceSetting = function(req, res, next) {
    return new Promise(function(resolve, reject) {
      return exec('rm -rf ./configs/ && mkdir configs && cp -R ./defaultConfigs/* ./configs', { cwd: path.resolve(__dirname, '../../')}, function(error, stdout, stderr) {
        if (error) reject(error);
        resolve();
      });
    })
    .then(function() {
      return res.send(200, "success.");
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var getServiceIp = function(req, res, next) {
    var interfaces = os.networkInterfaces();
    var addresses = [];
    var restPath = path.resolve(__dirname, '../../configs/rest.json');
    
    return fs.readFile(restPath, 'utf8', function(err, data) {
      var data = JSON.parse(data);
      if (this.serviceStatus) {
        for (var k in interfaces) {
          for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address + ':' + data.port);
            }
          }
        }
      }
      return res.send(200, { data: addresses });
    });
  };

  var getServiceLog = function(req, res, next) {
    return res.send(200, { data: JSON.stringify(global.logs) });
  };

  var resetData = function(req, res, next) {
    users.retrieveAdminUsers()
    .then(function(data) {
      var adminUsersContent = '';
      
      data.forEach(function(k, v) {
        adminUsersContent += k.toString() + '\n';
      });
      
      fs.writeFileSync(path.resolve(__dirname, '../../db/users.json'), adminUsersContent, 'utf8');
      fs.writeFileSync(path.resolve(__dirname, '../../db/datapoints.json'), '', 'utf8');
      fs.writeFileSync(path.resolve(__dirname, '../../db/devices.json'), '', 'utf8');
      fs.writeFileSync(path.resolve(__dirname, '../../db/prototypes.json'), '', 'utf8');
      return res.send(200, "success.");
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var databaseInfo = function(req, res, next) {
    var db = require(path.resolve(__dirname, '../../configs/db.json'));
    return res.send(200, { db: db.db });
  };

  var restartService = function(req, res, next) {
    _stopService();

    var id = setTimeout(function() {
      startMCSLiteService();
      clearTimeout(id);
      return res.send(200, "success.");
    }, 3000);
  };

  return {
    serviceStatus: false,
    retrieveServiceSetting: retrieveServiceSetting,
    editServiceSetting: editServiceSetting,
    resetServiceSetting: resetServiceSetting,
    getServiceIp: getServiceIp,
    resetData: resetData,
    getServiceLog: getServiceLog,
    startService: startService,
    stopService: stopService,
    databaseInfo: databaseInfo,
    restartService: restartService,
  };

};