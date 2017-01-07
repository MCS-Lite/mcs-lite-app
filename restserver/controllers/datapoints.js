module.exports = function ($db) {
  var datapoints = $db.datapoints;

  var uploadDatapoints = function(req, res, next) {
    var field = {};
    field.deviceId = req.params.deviceId;
    field.deviceKey = req.body.deviceKey;
    field.datachannelId = req.body.datachannelId;
    field.data = req.body.datachannel;
    field.timestamp = req.body.timestamp || new Date().getTime();

    return datapoints.uploadDatapoint(field)
    .then(function() {
      return res.send(200, 'success!');
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveDatapoints = function(req, res, next) {
    var field = {};
    field.deviceKey = req.header('deviceKey');
    field.deviceId = req.params.deviceId;
    field.datachannelId = req.params.datachannelId;

    return datapoints.retrieveDatachannelDatapoint(field)
    .then(function(data) {
      return res.send(200, data);
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    uploadDatapoints: uploadDatapoints,
    retrieveDatapoints: retrieveDatapoints,
  };

};