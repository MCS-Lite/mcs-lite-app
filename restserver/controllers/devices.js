
module.exports = function ($db) {
  var devices = $db.devices;

  var retrieveDevice = function (req, res, next) {
    return devices.retriveUserDevices({
      createUserId: userId,
      isActive: true,
    })
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveDeviceDetail = function(req, res, next) {
    var userId = req.user.userId;

    return devices.retriveUserDevices({
      createUserId: userId,
      deviceId: req.params.deviceId,
      isActive: true,
    })
    .then(function(data) {
      return res.send(200, { data: data[0] });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var addNewDevice = function(req, res, next) {
    var userId = req.user.userId;

    return devices.addNewDevice({
      createUserId: userId,
      deviceName: req.body.deviceName,
      deviceDescription: req.body.deviceDescription,
      deviceImageURL: req.body.deviceImageURL,
      prototypeId: req.params.prototypeId,
    })
    .then(function(data) {
      return res.send(200, 'success.')
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editNewDevice = function(req, res, next) {
    var userId = req.user.userId;

    return devices.editDevices({
      prototypeId: req.params.prototypeId,
      deviceId: req.params.deviceId,
    }, {
      deviceName: req.body.deviceName,
      deviceDescription: req.body.deviceDescription,
      deviceImageURL: req.body.deviceImageURL,
    })
    .then(function() {
      return res.send(200, 'success.');
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    retrieveDevice: retrieveDevice,
    retrieveDeviceDetail: retrieveDeviceDetail,
    addNewDevice: addNewDevice,
    editNewDevice: editNewDevice,
  };

};