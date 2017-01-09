var assert = require('chai').assert;
var init = require('../../index').init();
var datapoints = init.datapoints;
var devices = init.devices;
var shortid = require('shortid');

var userId = shortid.generate();
var deviceId = shortid.generate();
var deviceKey = shortid.generate();

devices.addNewDevice({
  createUserId: userId,
  deviceId: deviceId,
  deviceKey: deviceKey,
  deviceName: 'test device Name',
  deviceDescription: '123123123',
  deviceImageURL: 'http://www.google.com',
  prototypeId: shortid.generate(),
});

describe('NeDB connector: Datapoint', function() {
  describe('uploadDatapoint api', function() {
    it('Upload a datapoint should pass', function(done) {
      datapoints.uploadDatapoint({
        deviceId: deviceId,
        deviceKey: deviceKey,
        datachannelId: 'qweqwewqe',
        timestamp: new Date().getTime(),
        data: 123123,
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retrieveDeviceAllDatapoint api', function() {
    it('retrieve all datapoint (by device) should pass', function(done) {
      datapoints.retrieveDeviceAllDatapoint({
        deviceId: '123123',
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retrieveDatachannelDatapoint api', function() {
    it('retrieve all datapoint (by datachannel) should pass', function(done) {
      datapoints.retrieveDatachannelDatapoint({
        deviceId: '123123',
        datachannel: 'qweqwewqe',
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

});