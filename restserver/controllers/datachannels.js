var R = require('ramda');

const datachannelsHasHistory = [
  { name: 'GPIO', type: 1 },
  { name: 'PWM', type: 1 },
  { name: 'Analog', type: 1 },
  { name: 'Integer', type: 2 },
  { name: 'Float', type: 2 },
  { name: 'GPIO', type: 2 },
  { name: 'PWM', type: 2 },
];

module.exports = function ($db) {
  var datachannels = $db.datachannels;

  var checkDatachannelIdAvailable = function(req, res) {
    var dataChannelId = req.params.datachannelId;
    var prototypeId = req.params.prototypeId;

    return datachannels
      .retrievDatachannel({
        datachannelId: dataChannelId,
        prototypeId: prototypeId,
      })
      .then(function(results) {
        if (results.length === 0) {
          return res.send(200, true);
        }
        return res.send(200, false);
      })
      .catch(function(err) {
        return res.send(400, err);
      });
  };

  var addNewDatachannel = function(req, res, next) {
    var userId = req.user.userId;
    var prototypeId = req.params.prototypeId;
    var format = req.body.format || {};
    var hasHistory = R.contains(
      {
        name: req.body.channelType.name,
        type: req.body.type,
      },
      datachannelsHasHistory
    );

    if (Object.keys(format).length > 0) {
      Object.keys(format).forEach(function(k, v) {
        var formatObject = {};
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
      hasHistory: hasHistory,
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
    checkDatachannelIdAvailable: checkDatachannelIdAvailable,
    addNewDatachannel: addNewDatachannel,
    editDatachannel: editDatachannel,
    deleteDatachannel: deleteDatachannel,
  };

};
