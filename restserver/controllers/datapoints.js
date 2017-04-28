module.exports = function ($db) {
  var datapoints = $db.datapoints;
  var datachannels = $db.datachannels;
  var devices = $db.devices;
  var WebSocketClient = require('websocket').client;

  var formatArr = {
    1: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'number',
      },
    },
    2: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'string',
      },
    },
    3: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'number',
      },
    },
    4: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'string',
      },
    },
    5: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'string',
      },
    },
    7: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'number',
      },
    },
    11: {
      filter: ['datachannelId', 'timestamp', 'value'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'number',
      },
    },
    12: {
      filter: ['datachannelId', 'timestamp', 'value', 'period'],
      format: {
        datachannelId: 'number',
        timestamp: ['number', 'null'],
        value: 'number',
        period: 'number'
      },
    },
  };

  var checkRawData = function(data, format) {
    data = data.split(',');
    var object = { values: {} };
    format.filter.forEach(function(key, i) {
      if (i >= 2) {
        switch (format.format[key]) {
          case 'number':
            object.values[key] = Number(data[i]);
            break;
          case 'string':
            object.values[key] = data[i];
        }
      }else {
        object[key] = data[i];
      }
    });
    return object;
  };

  var parserRawData = function(data, prototypeId) {
    return new Promise(function(resolve, reject) {
      return resolve(data.split(',')[0])
    })
    .then(function(datachannelId) {
      return datachannels.retrievDatachannel({
        datachannelId: datachannelId,
        prototypeId: prototypeId,
        isActive: true,
      });
    })
    .then(function(datachannels) {
      if (datachannels.length > 0) {
        var obj = checkRawData(data, formatArr[datachannels[0].channelType.id]);
        return obj;
      }
      return {
        data: data,
        error: 'Cannot find this datachannelId.'
      };
    });
  };

  var uploadDatapointsByCSV = function(req, res, next) {
    var rawData;
    if (Object.keys(req.body).length === 0){
      return res.send(400, { message: 'Raw body is null.' });
    } else {
      rawData = req.body.toString().split('\n');
    }
    var deviceId = req.params.deviceId;
    var deviceKey = req.header('deviceKey');

    return devices.retriveUserDevices({
      deviceKey: deviceKey,
      deviceId: deviceId,
      isActive: true,
    })
    .then(function(data) {
      if (data.length === 0) {
        return res.send(200, { message: 'DeviceId and deviceKey is not valid.' })
      }
      var prototypeId = data[0].prototypeId;
      var retrievDatachannelPromise = [];
      rawData.forEach(function(key) {
        retrievDatachannelPromise.push(parserRawData(key, prototypeId));
      });
      return Promise.all(retrievDatachannelPromise);
    })
    .then(function(data) {
      var client = new WebSocketClient();
      client.on('connect', function(connection) {
        data.forEach(function(key) {
          if (!key.error) {
            connection.sendUTF(JSON.stringify(key));
          }
        });
        connection.close();
      });
      client.connect('ws://localhost:8000/deviceId/' + deviceId + '/deviceKey/' + deviceKey, '');
      return res.send(200, { data: data })
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var uploadDatapointsByJSON = function(req, res, next) {
    var datachannelId = req.params.datachannelId;
    var deviceKey = req.header('deviceKey');
    var deviceId = req.params.deviceId;
    var field = {};
    field.values = req.body.values;
    field.timestamp = req.body.timestamp;

    return devices.retriveUserDevices({
      deviceKey: deviceKey,
      deviceId: deviceId,
      isActive: true,
    })
    .then(function(data) {
      if (data.length === 0) {
        return res.send(400, { message: 'DeviceId or deviceKey is not valid.' });
      }

      var client = new WebSocketClient();
      client.on('connect', function(connection) {
        connection.sendUTF(JSON.stringify(field));
        connection.close();
      });
      client.connect('ws://localhost:8000/deviceId/' + deviceId + '/deviceKey/' + deviceKey, '');

      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveDatapoints = function(req, res, next) {
    var field = {};
    field.deviceId = req.params.deviceId;
    field.datachannelId = req.params.datachannelId;
    field.isActive = true;

    var skip = req.query.skip || 0;
    var sort = req.query.sort || { updatedAt: -1 };
    var start = req.query.start;
    var end = req.query.end;
    var limit = req.query.limit || 100;

    if (start && end) {
      field.updatedAt = {
        $gte: Number(start),
        $lte: Number(end),
      };
    }

    return devices.retriveUserDevices({
      deviceKey: req.header('deviceKey'),
      deviceId: field.deviceId,
      isActive: true,
    })
    .then(function(data) {
      if (data.length === 0) {
        return res.send(400, { message: 'DeviceID or DeviceKey is not valid.' });
      }
      return datapoints.retrieveDatachannelDatapoint(field, sort, skip, limit)
    })
    .then(function(data) {
      return res.send(200, { data: data.reverse() });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveDatapointsByCSV = function(req, res, next) {
    var field = {};
    field.deviceId = req.params.deviceId;
    field.datachannelId = req.params.datachannelId;
    field.isActive = true;

    var skip = req.query.skip || 0;
    var sort = req.query.sort || { updatedAt: -1 };
    var start = req.query.start;
    var end = req.query.end;
    var limit = req.query.limit || 1;

    return devices.retriveUserDevices({
      deviceKey: req.header('deviceKey'),
      deviceId: field.deviceId,
      isActive: true,
    })
    .then(function(data) {
      if (data.length === 0) {
        return res.send(400, { message: 'DeviceID or DeviceKey is not valid.' });
      }
      return datapoints.retrieveDatachannelDatapoint(field, sort, skip, limit)
    })
    .then(function(data) {
      // var data = data.reverse();
      var csvData = '';
      data.forEach(function(k, v) {
        csvData += k.datachannelId + ',' + k.createdAt + ',' + k.values.value;
        if (k.values.period) csvData += ',' + k.values.period;
        csvData += '\n';
      });
      return res.send(200, csvData);
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    uploadDatapointsByJSON: uploadDatapointsByJSON,
    uploadDatapointsByCSV: uploadDatapointsByCSV,
    retrieveDatapoints: retrieveDatapoints,
    retrieveDatapointsByCSV: retrieveDatapointsByCSV,
  };

};