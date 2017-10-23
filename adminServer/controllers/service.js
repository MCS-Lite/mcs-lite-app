var os = require('os');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

module.exports = function ($db) {
  var users = $db.users;

  var startService = function(req, res) {
    return global.startMCSLiteService()
      .then(function(message) {
        this.serviceStatus = true;
        return res.send(200, message);
      })
      .catch(function(err) {
        return res.send(400, err);
      });
  };

  var stopService = function(req, res) {
    return global.stopMCSLiteService()
      .then(function(message) {
        this.serviceStatus = false;
        return res.send(200, message);
      })
      .catch(function(err) {
        console.log('err');
        return res.send(400, err);
      });
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
      return (400, err);
    });
  };

  var clearAllData = function clearAllData(req, res) {
    var datachannels = $db.datachannels;
    var unittypes = $db.unittypes;
    var datapoints = $db.datapoints;
    var devices = $db.devices;
    var prototypes = $db.prototypes;

    var queue = [];

    queue.push(users.clearAllUser());
    queue.push(unittypes.clearAllUnittypes());
    queue.push(datachannels.clearAllDatachannels());
    queue.push(datapoints.clearAllDatapoints());
    queue.push(devices.clearAllDevices());
    queue.push(prototypes.clearAllPrototypes());

    Promise.all(queue)
      .then(function() {
        return res.send(200, 'success.');
      })
      .catch(function(err) {
        return res.send(400, err);
      });
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
    clearAllData: clearAllData,
  };

};
