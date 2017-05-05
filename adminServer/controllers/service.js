module.exports = function ($db) {

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
    res.send(200, "123132");
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
  };

};
