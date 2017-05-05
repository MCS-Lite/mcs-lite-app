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
    res.send(200, "123132");
  };

  var editServiceSetting = function(req, res, next) {
    res.send(200, "123132");
  };

  var resetServiceSetting = function(req, res, next) {
    res.send(200, "123132");
  };

  var getServiceIp = function(req, res, next) {
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
    res.send(200, { data: addresses });
  };

  var getServiceLog = function(req, res, next) {
    res.send(200, "123132");
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
