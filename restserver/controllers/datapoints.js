module.exports = function ($db) {

  var uploadDatapoints = function(req, res, next) {
    var deviceKey = req.body.deviceKey;
    var datachannel = req.body.datachannel;
    var data = req.body.datachannel;
    var timestamp = req.body.timestamp || new Date().getTime();

    

  };

  var retrieveDatapoints = function(req, res, next) {

  };

  return {
    uploadDatapoints: uploadDatapoints,
    retrieveDatapoints: retrieveDatapoints,
  };

};