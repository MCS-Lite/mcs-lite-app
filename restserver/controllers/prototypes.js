module.exports = function ($db) {
  var prototypes = $db.prototypes;
  var users = $db.users;
  var datachannels = $db.datachannels;

  var retrievePrototypeDetail = function(req, res, next) {
    var userId = req.user.userId;
    var prototypeId = req.params.prototypeId;

    return prototypes.retriveUserPrototypes({
      prototypeId: prototypeId,
      isActive: true,
    })
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrievePrototype = function(req, res, next) {
    var userId = req.user.userId;
    var prototypesData = [];
    return prototypes.retriveUserPrototypes({
      userId: userId,
      isActive: true,
    })
    .then(function(data) {
      prototypesData = data;
      return prototypes.retriveAllTemplatesPrototypes()
    })
    .then(function(data) {
      prototypesData = prototypesData.concat(data);
      return res.send(200, { data: prototypesData });
    })
    .catch(function(err) {
      return res.send(400, err)
    })
    res.send('123123');
  };

  var addNewPrototype = function(req, res, next) {
    var userId = req.user.userId;
    var field = {
      createdUserId: userId,
      prototypeName: req.body.prototypeName,
      prototypeDescription: req.body.prototypeDescription,
      prototypeImageURL: req.body.prototypeImageURL,
      version: req.body.version || '0.0.1',
    };

    return users.checkIsAdmin(userId)
    .then(function(data) {
      if (data.length === 1) {
        field.isTemplate = true;
      }
      return prototypes.addNewPrototype(field);
    })
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var addDataChannel = function(req, res, next) {
    var userId = req.user.userId;
    var prototypeId = req.params.prototypeId;

    return datachannels.addNewDatachannel({
      datachannelId: req.body.datachannelId,
      datachannelDescription: req.body.datachannelDescription,
      datachannelTypeId: req.body.datachannelTypeId,
      prototypeId: prototypeId,
      createUserId: userId,
      config: req.body.config,
    })
    .then(function(data) {
      return res.send(200, 'success.');
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editDataChannel = function(req, res, next) {
    var userId = req.user.userId;
    var prototypeId = req.params.prototypeId;
    var datachannelId = req.params.datachannelId;

    return datachannels.editDatachannel({
      datachannelId: datachannelId,
      prototypeId: prototypeId,
      isActive: true,
    }, {
      datachannelDescription: req.body.datachannelDescription,
      datachannelTypeId: req.body.datachannelTypeId,
    })
    .then(function() {
      return res.send(200, 'success.');
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    retrievePrototypeDetail: retrievePrototypeDetail,
    retrievePrototype: retrievePrototype,
    addNewPrototype: addNewPrototype,
    addDataChannel: addDataChannel,
    editDataChannel: editDataChannel,
  };

};