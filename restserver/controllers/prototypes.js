module.exports = function ($db) {
  var prototypes = $db.prototypes;
  var devices = $db.devices;
  var users = $db.users;
  var datachannels = $db.datachannels;

  var retrievAllTemplates = function(req, res, next) {
    return prototypes.retriveUserPrototypes({
      isActive: true,
      isTemplate: true,
    })
    .then(function(data) {
      res.send(200, { data: data });
    });
  };

  var retrievePrototypeDetail = function(req, res, next) {
    var userId = req.user.userId;
    var isAdmin = req.user.isAdmin;
    var prototypeId = req.params.prototypeId;

    var prototypeData;
    return prototypes.retriveUserPrototypes({
      prototypeId: prototypeId,
      isActive: true,
    })
    .then(function(data) {
      if (data.length !== 1) {
        return res.send(400, 'Can\'t find this prototype.')
      }
      prototypeData = data[0];
      if (isAdmin) {
        return devices.retrievePrototypeDevices({
          prototypeId: prototypeId,
        });
      } else {
        return devices.retrievePrototypeDevices({
          prototypeId: prototypeId,
          createUserId: userId,
        });
      }
    })
    .then(function(data){
      prototypeData.devices = data;
      prototypeData.devicesLength = data.length;
      return datachannels.retrievDatachannel({
        prototypeId: prototypeId,
      });
    })
    .then(function(data) {
      prototypeData.datachannels = data;
      console.log(prototypeData);
      return users.retrieveOneUser({
        userId: prototypeData.createUserId,
        isActive: true,
      });
    })
    .then(function(data) {
      prototypeData.user = {
        userId: data[0].userId,
        userName: data[0].userName,
      };
      return res.send(200, { data: prototypeData });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrievePrototype = function(req, res, next) {
    var userId = req.user.userId;
    var prototypesData = [];
    return prototypes.retriveUserPrototypes({
      createUserId: userId,
      isActive: true,
    })
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err)
    })
  };

  var addNewPrototype = function(req, res, next) {
    var userId = req.user.userId;
    var field = {
      createUserId: userId,
      prototypeName: req.body.prototypeName,
      prototypeDescription: req.body.prototypeDescription,
      prototypeImageURL: req.body.prototypeImageURL,
      version: req.body.version || '0.0.1',
      isTemplate: false,
    };

    return prototypes.addNewPrototype(field)
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editPrototype = function(req, res, next) {
    var userId = req.user.userId;
    return prototypes.editPrototype({
      createUserId: userId,
      prototypeId: req.params.prototypeId,
      isActive: true,
    }, {
      prototypeName: req.body.prototypeName,
      prototypeDescription: req.body.prototypeDescription,
      prototypeImageURL: req.body.prototypeImageURL,
      version: req.body.version,
    })
    .then(function() {
      return res.send(200, {message: 'success'});
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var deletePrototype = function(req, res, next) {
    var userId = req.user.userId;
    return prototypes.editPrototype({
      createUserId: userId,
      prototypeId: req.params.prototypeId,
    }, {
      isActive: false,
    })
    .then(function() {
      return res.send(200, {message: 'success'});
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var clonePrototype = function(req, res, next) {
    var prototypeId = req.params.prototypeId;
    var data = req.body;
    data.userId = req.user.userId;
    return prototypes.clonePrototype(prototypeId, data)
    .then(function(data) {
      return res.send(200, {data: data});
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    retrievePrototypeDetail: retrievePrototypeDetail,
    retrievePrototype: retrievePrototype,
    addNewPrototype: addNewPrototype,
    editPrototype: editPrototype,
    deletePrototype: deletePrototype,
    clonePrototype: clonePrototype,
    retrievAllTemplates: retrievAllTemplates,
  };

};