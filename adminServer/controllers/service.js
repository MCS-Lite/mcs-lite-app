var os = require('os');

module.exports = function ($db) {

  var startService = function(req, res, next) {
    global.startMCSLiteService();
    res.send(200, "success!");
  };

  var stopService = function(req, res, next) {
    global.stopMCSLiteService();
    res.send(200, "success!");
  };

  var retrieveServiceSetting = function(req, res, next) {
    try {
      var settingContent = require('../../configs/' + req.params.settingId + '.json');
      res.send(200, { data: settingContent });
    } catch (e) {
      res.send(400, "Cannot find this file.");
    }
  };

  var editServiceSetting = function(req, res, next) {
    var content = req.body.content;
    res.send(200, "success.");
  };

  var resetServiceSetting = function(req, res, next) {
    res.send(200, "123132");
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
    res.send(200, { data: addresses });
  };

  var getServiceLog = function(req, res, next) {
    res.send(200, "log.");
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
