module.exports = function ($db) {
  var datapoints = $db.datapoints;
  var datachannels = $db.datachannels;

  var uploadDatapoints = function(req, res, next) {
    var field = {};
    field.deviceId = req.params.deviceId;
    field.deviceKey = req.header.deviceKey;
    field.datachannelId = req.params.datachannelId;
    // field.values = req.body.values;
    // field.timestamp = req.body.timestamp || new Date().getTime();

    return datapoints.uploadDatapoint(field)
    .then(function() {
      return datachannels.editDatachannel({
        deviceId: field.deviceId,
        deviceKey: field.deviceKey,
        datachannelId: field.datachannelId,
        isActive: true,
      },{
        updatedAt: new Date().getTime(),
      });
    })
    .then(function(data) {
      return res.send(200, { message: 'success' });
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