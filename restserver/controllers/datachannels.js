module.exports = function ($db) {
  var datachannels = $db.datachannels;

  var addNewDatachannel = function(req, res, next) {
    var userId = req.user.userId;
    var prototypeId = req.params.prototypeId;
    var format = req.body.format || {};

    if (Object.keys(format).length > 0) {
      Object.keys(format).forEach(function(k, v) {
        let formatObject = {};
        formatObject.id = format[k].id;
        formatObject.value = format[k].value;
        format[k] = formatObject;
      });
    }

    return datachannels.addNewDatachannel({
      datachannelId: req.body.id,
      datachannelName: req.body.name,
      datachannelDescription: req.body.description,
      type: req.body.type,
      channelType: req.body.channelType,
      isHidden: req.body.isHidden,
      prototypeId: prototypeId,
      createUserId: userId,
      format: format,
    })
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editDatachannel = function(req, res, next) {
    var userId = req.user.userId;
    var prototypeId = req.params.prototypeId;
    var datachannelId = req.params.datachannelId;
    var format = req.params.format;

    return datachannels.editDatachannel({
      prototypeId: prototypeId,
      datachannelId: datachannelId,
      createUserId: userId,
      isActive: true,
    }, {
      datachannelName: req.body.datachannelName,
      datachannelDescription: req.body.datachannelDescription,
      format: format,
    })
    .then(function() {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var deleteDatachannel = function(req, res, next) {
    var datachannelId = req.params.datachannelId;
    var createUserId = req.user.userId;
    var prototypeId = req.params.prototypeId;

    return datachannels.deleteDatachannel({
      prototypeId: prototypeId,
      datachannelId: datachannelId,
      createUserId: createUserId,
    })
    .then(function() {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    })
  };

  return {
    addNewDatachannel: addNewDatachannel,
    editDatachannel: editDatachannel,
    deleteDatachannel: deleteDatachannel,
  };

};