module.exports = function ($db) {
  var datachannels = $db.datachannels;

  var addNewDatachannels = function(req, res, next) {
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
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editDatachannels = function(req, res, next) {
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
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    addNewDatachannels: addNewDatachannels,
    editDatachannels: editDatachannels,
  };

};