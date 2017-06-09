var os = require('os');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

module.exports = function ($db) {

  var startService = function(req, res, next) {
    global.startMCSLiteService();
    return res.send(200, "success!");
  };

  var stopService = function(req, res, next) {
    global.stopMCSLiteService();
    return res.send(200, "success!");
  };

  var retrieveServiceSetting = function(req, res, next) {
    try {
      var settingContent = require(path.resolve(__dirname, '../../configs/' + req.params.settingId + '.json'));
      res.send(200, { data: settingContent });
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
      return (400, err);
    });
  };

  var getServiceIp = function(req, res, next) {
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return res.send(200, { data: addresses });
  };

  var getServiceLog = function(req, res, next) {
    return res.send(200, { data: JOSN.stringify(global.logs) });
  };

  return {
    retrieveServiceSetting: retrieveServiceSetting,
    editServiceSetting: editServiceSetting,
    resetServiceSetting: resetServiceSetting,
    getServiceIp: getServiceIp,
    getServiceLog: getServiceLog,
    startService: startService,
    stopService: stopService,
  };

};
