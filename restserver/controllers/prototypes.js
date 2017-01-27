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
      return res.send(200, { data: data[0] });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrievePrototype = function(req, res, next) {
    var userId = req.user.userId;
    var prototypesData = [];
    return prototypes.retriveUserPrototypes({
      createdUserId: userId,
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

  var editPrototype = function(req, res, next) {
    var userId = req.user.userId;
    return prototypes.editPrototype({
      createdUserId: userId,
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
      createdUserId: userId,
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
  };

};