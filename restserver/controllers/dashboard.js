module.exports = function ($db) {
  var prototypes = $db.prototypes;
  var devices = $db.devices;

  var dashboard = function(req, res, next) {
    var prototypeData = {};
    var userId = req.user.userId;

    return prototypes.retriveAllTemplatesPrototypes()
    .then(function(data) {
      // console.log(data);
      prototypeData.templates = data;
      return prototypes.retriveUserPrototypes({
        createUserId: userId,
        isActive: true,
      }, {
        updatedAt: -1,
      }, 0, 1);
    })
    .then(function(data) {
      prototypeData.userPrototypes = data[0];
      if (data.length !== 0) {
        return devices.retrievePrototypeDevices({
          prototypeId: data[0].prototypeId,
        });
      } else {
        return [];
      }
    })
    .then(function(data) {
      if (prototypeData.userPrototypes) {
        prototypeData.userPrototypes.devices = data
      } else {
        prototypeData.userPrototypes = {};
      }
      return res.send(200, { data: prototypeData });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    dashboard: dashboard,
  };
}